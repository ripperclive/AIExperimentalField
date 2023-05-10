import chat from "./components/chat.js";

import extract from "./components/knowledgeBase.js";

import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";

// 从文档中创建一个矢量存储
const vectorStore = await HNSWLib.fromDocuments(await extract(), new OpenAIEmbeddings({ openAIApiKey: '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' }));

const chain = RetrievalQAChain.fromLLM(chat, vectorStore.asRetriever());
console.log('初始化完毕') 

const knowledgeBaseChat =async(inputValue)=>{
console.log('输入问题：',inputValue)
   const res = await chain.call({
     query: inputValue,
   });
 
   console.log('AI:',res) 

}

export default knowledgeBaseChat