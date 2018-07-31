import secp256k1 from 'secp256k1'

export const applyECDSASig = (privateKey, input) => {
    return secp256k1.sign(input, privateKey)
}

export const verifyECDSASig = (publicKey, data, signature) => {
    return secp256k1.verify(data, signature, publicKey)
}

export const getStringFromKey = key => {
    return key.toString()
}
