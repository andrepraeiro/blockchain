import Wallet from './wallet'
import Transaction from './transaction'

export const walletTest = () => {
    const walletA = new Wallet()
    const walletB = new Wallet()
    console.log(`PrivateKey : ${walletA.privateKey.toString('hex')}`)
    console.log(`PublicKey : ${walletA.publicKey.toString('hex')}`)
    const transaction = new Transaction(walletA.publicKey, walletB.publicKey, 5, null)
    transaction.generateSignature(walletA.privateKey)
    console.log(`Signature is verified : ${transaction.verifySignature()}`)
}
