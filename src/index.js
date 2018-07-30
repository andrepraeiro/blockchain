import Block from './block'
const blockChain = []
blockChain.push(new Block('Hi im the first block'))
blockChain.push(new Block('Yo im the second block', blockChain[blockChain.length - 1].hash))
blockChain.push(new Block('Hey im the third block', blockChain[blockChain.length - 1].hash))
console.log(blockChain)
