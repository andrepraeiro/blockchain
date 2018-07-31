import Block from './block'

export const blockChainTest = () => {
    const difficulty = 2
    console.time('Total')
    const blockChain = []
    console.time('Block #1')
    blockChain.push(new Block('Hi im the first block'))
    blockChain[0].mineBlock(difficulty)
    console.timeEnd('Block #1')
    console.time('Block #2')
    blockChain.push(new Block('Yo im the second block', blockChain[blockChain.length - 1].hash))
    blockChain[1].mineBlock(difficulty)
    console.timeEnd('Block #2')
    console.time('Block #3')
    blockChain.push(new Block('Hey im the third block', blockChain[blockChain.length - 1].hash))
    blockChain[2].mineBlock(difficulty)
    console.timeEnd('Block #3')

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
    console.timeEnd('Total')
}
