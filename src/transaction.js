import sha256 from 'js-sha256'
import { applyECDSASig, verifyECDSASig, getStringFromKey } from './utils'
import { utxos, minimumTransaction } from './utxos'
import TransactionOutput from './transactionOutput'

export default class Transaction {
    constructor(from, to, value, inputs) {
        this.sender = from
        this.recipient = to
        this.value = value
        this.inputs = inputs
        this.sequence = 0
        this.outputs = []
    }

    calculateHash() {
        this.sequence++
        return sha256(
            `${getStringFromKey(this.sender)}
            ${getStringFromKey(this.recipient)}
            ${this.value}
            ${this.sequence}`
        )
    }

    generateSignature(privateKey) {
        const data = Buffer.from(
            sha256(`${getStringFromKey(this.sender)}
            ${getStringFromKey(this.recipient)}
            ${this.value}`),
            'hex'
        )
        this.signature = applyECDSASig(privateKey, data)
    }

    verifySignature() {
        const data = Buffer.from(
            sha256(`${getStringFromKey(this.sender)}
            ${getStringFromKey(this.recipient)}
            ${this.value}`),
            'hex'
        )
        return verifyECDSASig(this.sender, data, this.signature.signature)
    }

    processTransaction() {
        if (!this.verifySignature()) {
            console.log('#Transaction Signature failed to verify')
            return false
        }
        //gather transaction inputs (make sure they are unspent)
        this.inputs.map(i => {
            i.UTXO = utxos.get(i.transactionOutputId)
        })

        //check if transaction is valid
        if (getInputsValue() < minimumTransaction) {
            console.log(`#Transaction Inputs too small ${getInputsValue}`)
            return false
        }

        //generate transaction outputs
        const leftOver = this.getInputsValue() - this.value //get the value of inputs  then the left over change
        this.transactionId = this.calculateHash()
        this.outputs.push(new TransactionOutput(this.recipient, this.value, this.transactionId)) //send value to recepient
        this.outputs.push(new TransactionOutput(this.recipient, leftOver, this.transactionId)) //send the left over change back to sender

        //add outputs to unspent list
        this.outputs.map(o => {
            utxos.set(o.id, o)
        })

        //remove transaction inputs from UTXO lists as spent
        this.inputs.map(i => {
            if (i.UTXO) {
                UTXO.delete(i.UTXO.id)
            }
        })

        return true
    }

    getInputsValue() {
        let total = 0
        this.inputs.map(i => {
            if (i.UTXO) {
                total += i.UTXO.value
            }
        })
        return total
    }

    getOutputsValue() {
        let total = 0
        this.outputs.map(o => {
            total += o.value
        })
        return total
    }
}
