import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

export const run = async () => {
    const model = new OpenAI({ openAIApiKey: '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' });
    const text = fs.readFileSync("诗词曲.txt", "utf8");
    const textSplitter = new CharacterTextSplitter({
        separator: '\n',
        chunkSize: 200,
        chunkOverlap: 2,
    });
    const docs = await textSplitter.createDocuments([text]);


    console.log(docs)

    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: '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' }));


    const result = await vectorStore.similaritySearchWithScore("你能介绍一下群鹤咏吗", 1);
    console.log(result)


    // const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    // const res = await chain.call({
    //     query: "你好，你喜欢群鹤咏这首诗吗？你能介绍一下吗？",
    // }
    // )
    // console.log({ res },
    //     // chain,
    //     // chain.retriever.vectorStore.args,
    //     // chain.combineDocumentsChain.llmChain.prompt.inputVariables,
    //     // chain.combineDocumentsChain.llmChain.llm.caller,
    //     // '-----------------------------------',
    //     // chain.combineDocumentsChain.llmChain.llm.clinent,
    //     // chain.combineDocumentsChain.llmChain.llm.clientConfig,
    // );
}


run()