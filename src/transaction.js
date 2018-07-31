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
        const data = `${this.sender}${this.recipient}${this.value}`
        this.signature = applyECDSASig(privateKey, data)
    }

    verifySignature() {
        const data = `${this.sender}${this.recipient}${this.value}`
        return verifyECDSASig(this.sender, data, this.signature)
    }
}
