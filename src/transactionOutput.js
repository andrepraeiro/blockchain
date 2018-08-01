import sha256 from 'js-sha256'
import { getStringFromKey } from './utils'
export default class TransactionOutput {
    constructor(recipient, value, parentTransactionId) {
        this.recipient = recipient
        this.value = value
        this.parentTransactionId = parentTrasactionId
        this.id = sha256(`${getStringFromKey(recipient)}${value}${parentTransactionId}`)
    }

    isMine(publicKey) {
        return publicKey === this.recipient
    }
}
