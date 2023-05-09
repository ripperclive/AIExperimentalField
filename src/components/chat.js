import { ChatOpenAI } from "langchain/chat_models/openai";


// 一个最基本的聊天模型
const chat = new ChatOpenAI({ openAIApiKey: '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', temperature: 0 });


export default chat