export default class TransactionInput {
    constructor(transactionOutputId) {
        this.transactionOutputId = transactionOutputId
        this.UTXO = {}
    }
}
