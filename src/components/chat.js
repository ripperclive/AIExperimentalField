import { ChatOpenAI } from "langchain/chat_models/openai";


// 一个最基本的聊天模型
const chat = new ChatOpenAI({
    openAIApiKey: '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',
    temperature: 0.9,
    // streaming:true,
    // timeout: 10000
});


export default chat