import sha256 from 'js-sha256'
export default class Block {
    constructor(data, previousHash) {
        this.data = data
        this.previousHash = previousHash || '0'
        this.timeStamp = new Date()
        this.nonce = 0
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return sha256(`${this.previousHash}${this.timeStamp}${this.nonce}${this.data}`)
    }

    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty) 
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log(`Block mined!!! : ${this.hash} `)
    }
}
