import sha256 from 'js-sha256'
export default class Block {
    constructor(data, previousHash) {
        this.data = data
        this.previousHash = previousHash || '0'
        this.timeStamp = new Date()
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return sha256(`${this.previousHash}${this.timeStamp}${this.data}`)
    }
}
