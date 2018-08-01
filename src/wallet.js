import { randomBytes } from 'crypto'
import secp256k1 from 'secp256k1'

import TransactionInput from './transactionInput'
import Transaction from './transaction'

export default class Wallet {
    generateKeyPair() {
        do {
            this.privateKey = randomBytes(32)
        } while (!secp256k1.privateKeyVerify(this.privateKey))

        // get the public key in a compressed format
        this.publicKey = secp256k1.publicKeyCreate(this.privateKey)
    }

    constructor() {
        this.generateKeyPair()
        this.UTXOs = new Map()
    }

    //returns the balance and stores the UTXO's owned by this wallet in this UTXOs
    getBalance() {
        let total = 0
        this.UTXOs.forEach((value, key, map) => {
            const UTXO = value
            if (UTXO.isMine(this.publicKey)) {
                //if output blongs to me (if coins belong to me)
                this.UTXOs.set(UTXO.id, UTXO)
                total += UTXO.value
            }
        })
        return total
    }

    //generates and returns a new transaction from this wallet
    sendFunds(_recipient, value) {
        if (this.getBalance() < value) {
            //gather balanc and checks funds
            console.log('#Not enought funds to send transaction. Transaction discarted')
            return null
        }
        //create array list of inputs
        inputs = []
        let total = 0
        //TO.DO
        //verify if some works on Maps, and the return will continue the execution
        this.UTXOs.some((valueS, key, map) => {
            const UTXO = valueS
            total += UTXO.value
            inputs.put(new TransactionInput(UTXO.id))
            return total > value
        })

        const newTransaction = new Transaction(this.publicKey, _recipient, value, inputs)
        newTransaction.generateSignature(this.privateKey)
        inputs.forEach(e => {
            this.UTXOs.delete(e.transactionOutputId)
        })
        return newTransaction
    }
}
