import { ChatOpenAI } from "langchain/chat_models/openai";


// 一个最基本的聊天模型
const chat = new ChatOpenAI({
    openAIApiKey: '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',
    temperature: 0.5,
    // streaming:true,
    timeout:10000
});


export default chat