import Wallet from './wallet'
import Transaction from './transaction'
import { getStringFromKey } from './utils'

export const walletTest = () => {
    const walletA = new Wallet()
    const walletB = new Wallet()
    console.log(`PrivateKey : ${getStringFromKey(walletA.privateKey)}`)
    console.log(`PublicKey : ${getStringFromKey(walletA.publicKey)}`)
    const transaction = new Transaction(walletA.publicKey, walletB.publicKey, 5, null)
    transaction.generateSignature(walletA.privateKey)
    console.log(`Signature is verified : ${transaction.verifySignature()}`)
}
