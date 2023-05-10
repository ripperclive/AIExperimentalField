
import chat from "./components/chat.js";
// 搜索AIP 相关
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutorWithOptions } from "langchain/agents";




// 结合google或者其他工具来分析   出了个BUG,AI会一直搜
const SERPAPI_API_KEY = '1adfb322f8f8983f61de305617140424416408d6cf07fc9eaa6e1aefc374489d'
const tools = [
    new SerpAPI(SERPAPI_API_KEY, {
        location: 'China,Beijing',
        hl: 'zh-cn',
        gl: 'cn'
    }),
    new Calculator(),
];

const executor = await initializeAgentExecutorWithOptions(tools, chat, {
    agentType: "zero-shot-react-description",
});
const googleChat = async (inputValue) => {
    const response = await executor.call({ input: inputValue }
    );
    console.log(response)
}




export default googleChat