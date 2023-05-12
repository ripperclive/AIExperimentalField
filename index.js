import readline from 'readline'
import dotenv from 'dotenv'
import steamChat from './src/streamChat.js'
import memoryChat from './src/memoryChat.js'
import ordinaryChat from './src/ordinaryChat.js'
import googleChat from './src/googleChat.js'
import knowledgeBaseChat from './src/knowledgeChat.js'
// import difyChat from './src/difyChat.js'
dotenv.config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', (input) => {
    memoryChat(input)
}
);

