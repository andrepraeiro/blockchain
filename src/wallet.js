import { randomBytes } from 'crypto'
import secp256k1 from 'secp256k1'
export default class Wallet {
    generateKeyPair() {
        do {
            this.privateKey = randomBytes(32)
        } while (!secp256k1.privateKeyVerify(this.privateKey))

        // get the public key in a compressed format
        this.publicKey = secp256k1.publicKeyCreate(this.privateKey)
    }

    constructor() {
        this.privateKey = {}
        this.publicKey = {}
        this.generateKeyPair()
    }
}
