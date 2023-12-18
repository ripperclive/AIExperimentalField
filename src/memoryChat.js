import chat from "./components/chat.js";
import chatPrompt from "./components/template.js";
import { PromptTemplate } from "langchain/prompts";

// 缓存
import { BufferMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { ConversationChain } from "langchain/chains";
import { BufferWindowMemory } from "langchain/memory";
import { ConversationSummaryMemory } from "langchain/memory";
// openAI官方提供的文本分析器，可以将文本用向量来表示,也可以用来生成摘要。 需要KEY
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { VectorStoreRetrieverMemory } from "langchain/memory";


// new一个
const memory = new BufferMemory({ returnMessages: true, memoryKey: "history" })

// 因为使用的是ConversationChain，可以顺路把模板也塞进去
const memoryChain = new ConversationChain({
    memory: memory,
    prompt: chatPrompt,
    llm: chat,
})
//------------------------------------------------------------------------------------------------------------

// 如果频繁聊天占用内存过大，也可以限制窗口大小
// k:1 表示限制窗口大小为一次会话
const restrictMemory = new BufferWindowMemory({ k: 1, returnMessages: true, memoryKey: "history" })
const restrictMemoryChain = new ConversationChain({
    memory: restrictMemory,
    prompt: chatPrompt,
    llm: chat,
})
//------------------------------------------------------------------------------------------------------------
// 如果输入一些复杂的组合信息，可以选择让AI去缓存历史信息的摘要，而不是去死记硬背聊天记录
// 需要配合模板一起使用
const intelligenceMemory = new ConversationSummaryMemory({
    memoryKey: "chat_history",
    llm: chat
});

const prompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
  Current conversation:
  {chat_history}
  Human: {input}
  AI:`);
const intelligenceMemoryChain = new LLMChain({ llm: chat, prompt, memory: intelligenceMemory });
/**
 * 既然AI会整合聊天记录，并且组织成一个上下文，如果在用户和AI通话前使用SystemChatMessage提前和AI打好招呼铺垫一下上下文？
 *     （😅那为啥不直接拼模板啊？）
 *     const response = await chat.call([
 *     new SystemChatMessage(
 *         '我叫露丝，我的生日是4月30日'
 *     ),
 *     new HumanChatMessage(
 *         { input: inputValue }
 *     )
 * ])
 * 然而并不行，相关功能肯定是有，但是不能这么写
*/


// 缓存的内容是存储在内存中的，如果需要持久化保存，官网给的例子使用Motorhead
// 我没写过后端，不知道用户的聊天记录或者聊天摘要全部存在缓存里会不会给服务器干💥，鉴于学习成本这块先略过
//------------------------------------------------------------------------------------------------------------


// 也可以将对话数据存储在VectorDB中，VectorDB是一个高性能的向量检索库，基于类似HNSW的算法来进行快速的相似度搜索
// HNSW相关的库后面也会用到，比如知识库
const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings({ openAIApiKey: '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' }))
// 
const vectorStoreMemory = new VectorStoreRetrieverMemory({
    // 1是要回溯的文本/对话数量
    vectorStoreRetriever: vectorStore.asRetriever(1),
    memoryKey: "history",
});



// 在开始之前可以先将一些信息保存在缓存中
await vectorStoreMemory.saveContext(
    { input: "我的性别是武装直升机" },
    { output: "天哪，你一定是个美国人" }
)
await vectorStoreMemory.saveContext(
    { input: "你好,我的名字叫jim" },
    { output: "是的,你叫jim" }
)
await vectorStoreMemory.saveContext(
    { input: "我最喜欢的动物是人" },
    { output: "那太好了" }
)
await vectorStoreMemory.saveContext(
    { input: "我最喜欢的代步工具是AC-130" },
    { output: "那你一定很有钱" }
)
// 输出一下看看效果
// console.log(
//     await vectorStoreMemory.loadMemoryVariables({ prompt: "我的性别是什么" })
// )
// { history: 'input: 我的性别是武装直升机\noutput: ……' }

const vectorPrompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Relevant pieces of previous conversation:
{history}

(You do not need to use these pieces of information if not relevant)

Current conversation:
Human: {input}
AI:`);

const vectorChain = new LLMChain({ llm: chat, prompt:vectorPrompt, memory:vectorStoreMemory });


/**
 * memoryChain: 普通缓存
 * restrictMemoryChain: 限制聊天窗口
 * intelligenceMemoryChain: 智能缓存，根据聊天内容生成摘要
 * vectorChain: 使用向量库
 */
async function memoryChat(inputValue) {

    const response = await memoryChain.call({ input: inputValue })
    console.log(response)
    // console.log({ 'AI的内心OS': await intelligenceMemory.loadMemoryVariables({}) })

}



export default memoryChat