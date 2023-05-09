import readline from 'readline'
import dotenv from 'dotenv'
import chatGPT from './src/index.js'

dotenv.config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', (input) => {
    // console.log()
    // questionAI1(input)
    // questionAI2(input)
    // questionAI3(input)
    chatGPT(input)
}
);

