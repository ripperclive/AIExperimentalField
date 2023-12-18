import chat from "./src/components/chat.js";
import { PromptTemplate } from "langchain/prompts";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";

// 缓存
import { LLMChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { VectorStoreRetrieverMemory } from "langchain/memory";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";


// const text_list = fs.readFileSync("src/files/GRE数学-张鹏-第1课.txt", "utf8");
const text_list = fs.readFileSync("src/files/翟少成托福口语第1课.txt", "utf8");
const tags = ['GRE数学']
// const text_listZ = fs.readFileSync("src/files/诗词曲.txt", "utf8");
const textSplitter = new RecursiveCharacterTextSplitter({
    separator: '',
    chunkSize: 100,
    chunkOverlap: 10,
});
// splitDocuments 拆分文档   createDocuments 拆分字符串
const docs = await textSplitter.createDocuments([text_list], [tags])

// console.log(docs)

// docs.map((item)=>{
//     console.log(item.metadata)
// })
// 从文档中创建一个矢量存储
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: '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' }));

// 创建一个支持文档检索的链
const chain = RetrievalQAChain.fromLLM(chat, vectorStore.asRetriever());

const res = await chain.call({
    // query: '根据我给你的上下文，总结一下GRE数学考试的特点，回答要精炼，争取130字左右',
    // query: '根据我给你的上下文，生成一个摘要，要求在50字左右。',
    query: '根据我给你的上下文,总结一下托福口语的考试技巧和注意事项,回答要详细,大概300字。不要出现「根据你提供的上下文这种无关的话」',
})


console.log(res)


// // 缓存例子  似乎不能用
// const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings({ openAIApiKey: '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' }))
// // 
// const vectorStoreMemory = new VectorStoreRetrieverMemory({
//     // 1是要回溯的文本/对话数量
//     vectorStoreRetriever: vectorStore.asRetriever(1),
//     memoryKey: "history",
// });

// await vectorStoreMemory.saveContext(
//     { input: "接下来我要给你一些台词，请你帮我生成一个准确的摘要" },
//     { output: "好的" }
// )
// await vectorStoreMemory.saveContext(
//     { input: text },
//     { output: "收到" }
// )
// const vectorPrompt =
//     PromptTemplate.fromTemplate(`
// The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

// Relevant pieces of previous conversation:
// {history}

// (You do not need to use these pieces of information if not relevant)

// Current conversation:
// Human: {input}
// AI:
// `);

// const vectorChain = new LLMChain({ llm: chat, prompt: vectorPrompt, memory: vectorStoreMemory });
// const response = await vectorChain.call({ input: '能给我讲讲什么是GRE数学吗' })
// console.log(response, { 'AI的内心OS': await intelligenceMemory.loadMemoryVariables({}) })


const getDoc = () => {

}
