import { ChatOpenAI } from "langchain/chat_models/openai";

// 一个最基本的聊天模型
const chat = new ChatOpenAI({
    openAIApiKey: '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',
    temperature: 0.9,
    // streaming:true,
    // timeout: 10000
    callbacks: [
        {
          handleLLMStart: async (llm, prompts) => {
            console.log(JSON.stringify(llm, null, 2));
            console.log(JSON.stringify(prompts, null, 2));
          },
          handleLLMEnd: async (output) => {
            console.log(JSON.stringify(output, null, 2));
          },
          handleLLMError: async (err) => {
            console.error(err);
          },
        },
      ],
});


export default chat