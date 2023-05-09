
import chat from "./components/chat.js";
import memoryChat from "./components/memoryChat.js";
import getModal from "./components/fileModal.js";
// langchain的API 用于构建一个简单的LLM
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
// 模板
import {
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
} from "langchain/prompts";
import { LLMChain } from 'langchain';

// 搜索AIP 相关
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutorWithOptions } from "langchain/agents";



// 一个简单的聊天模型

// 模板
// const translationPrompt = ChatPromptTemplate.fromPromptMessages([
//     SystemMessagePromptTemplate.fromTemplate(
//         '你是一个乐于助人的{input_identity},在任何回答下面都要带上一个「喵~」'
//     ),
//     HumanMessagePromptTemplate.fromTemplate(
//         '{input_question}'
//     )
// ])

// const questionAI1 = async (inputValue) => {
//     // 简单调用
//     const response1 = await chat.call([
//         new SystemChatMessage(
//             '你是一个乐于助人的猫娘，在任何回答下面都要带上一个「喵~」'
//         ),
//         new HumanChatMessage(
//             inputValue
//         )
//     ])
//     console.log(response1.text)
//     // 使用模板  每次使用都需要新构建
//     const response2 = await chat.generatePrompt([
//         await translationPrompt.formatPromptValue({
//             input_identity: '猫娘',
//             input_question: inputValue
//         })
//     ])
//     console.log(response2.generations)
// }
//     // -------------------------------------------------------------------------------

// LLMChain 可以多次调用并且记住以前的消息（并没有？）
// const chain = new LLMChain({
//     prompt: translationPrompt,
//     llm: chat
// })
// const responseEx = await chat.generatePrompt([
//     await translationPrompt.formatPromptValue({
//         input_identity: '猫娘',
//         input_question: '介绍一下你自己'
//     })
// ])
// console.log(responseEx.generations)

// const questionAI2 = async (inputValue) => {
// 如果没有条件可以直接使用run
//     const response3 = await chain.call({
//         input_identity: '猫娘',
//         input_question: inputValue
//     });
//     console.log(response3)
// }
//     // -------------------------------------------------------------------------------

// 结合google或者其他工具来分析   出了个BUG,AI会一直搜
// const SERPAPI_API_KEY = '1adfb322f8f8983f61de305617140424416408d6cf07fc9eaa6e1aefc374489d'
// const tools = [
//     new SerpAPI(SERPAPI_API_KEY, {
//         location: 'China,Beijing',
//         hl: 'zh-cn',
//         gl: 'cn'
//     }),
//     new Calculator(),
// ];

// const executor = await initializeAgentExecutorWithOptions(tools, chat, {
//     agentType: "zero-shot-react-description",
// });
// const questionAI3 = async (inputValue) => {
//     const response4 = await executor.call({ input: inputValue }
//     );
//     console.log(response4)
// }



const questionAI4 = async (inputValue) => {
    // memoryChat(inputValue)
    console.log(getModal())
}



const  chatGPT= questionAI4
export default chatGPT