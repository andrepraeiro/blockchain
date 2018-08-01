import sha256 from 'js-sha256'
import { applyECDSASig, verifyECDSASig } from './utils'
export default class Transaction {
    constructor(from, to, value, inputs) {
        this.sender = from
        this.recipient = to
        this.value = value
        this.inputs = inputs
        this.sequence = 0
    }

    calculateHash() {
        this.sequence++
        return sha256(`${this.sender}${this.recipient}${this.value}${this.sequence}`)
    }

    generateSignature(privateKey) {
        const data = Buffer.from(sha256(`${this.sender}${this.recipient}${this.value}`), 'hex')
        this.signature = applyECDSASig(privateKey, data)
    }

    verifySignature() {
        const data = Buffer.from(sha256(`${this.sender}${this.recipient}${this.value}`), 'hex')
        return verifyECDSASig(this.sender, data, this.signature.signature)
    }
}
