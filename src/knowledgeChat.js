import chat from "./components/chat.js";

import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";


// 目前只能读txt，loader加载会报错，后面研究
const text = fs.readFileSync("src/files/诗词曲.txt", "utf8");
const textSplitter = new CharacterTextSplitter({
  separator: '  ',
  chunkSize: 10,
  chunkOverlap: 2,
});


const docs = await textSplitter.createDocuments([text]);


// 从文档中创建一个矢量存储
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: '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' }));

// 创建一个支持文档检索的链
const chain = RetrievalQAChain.fromLLM(chat, vectorStore.asRetriever());

const knowledgeBaseChat = async (inputValue) => {

  const res = await chain.call({
    query: inputValue,
  }
  )
  console.log({ res },
  )

}

export default knowledgeBaseChat