import Block from './block'
const blockChain = []
blockChain.push(new Block('Hi im the first block'))
blockChain[0].mineBlock(3)
blockChain.push(new Block('Yo im the second block', blockChain[blockChain.length - 1].hash))
blockChain[1].mineBlock(3)
blockChain.push(new Block('Hey im the third block', blockChain[blockChain.length - 1].hash))
blockChain[2].mineBlock(3)

const isChainValid = blockChain => {
    let i = 0
    blockChain.map((currentBlock, i) => {
        let previousBlock = blockChain[i - 1]
        if (currentBlock.hash !== currentBlock.calculateHash()) {
            console.log('current hashes not equal')
            return false
        }
        if (previousBlock && previousBlock.hash !== currentBlock.previousHash) {
            console.log('previous hashes not equal')
            return false
        }
    })
    return true
}

if (isChainValid(blockChain) === true) {
    console.log('hashes are equal')
}

console.log(blockChain)