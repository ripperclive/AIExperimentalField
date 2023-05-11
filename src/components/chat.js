import { ChatOpenAI } from "langchain/chat_models/openai";


// 一个最基本的聊天模型
const chat = new ChatOpenAI({
    openAIApiKey: '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',
    temperature: 0.5,
    // streaming:true,
//     timeout:10000
});


export default chat