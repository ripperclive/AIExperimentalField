import { ChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage ,HumanChatMessage} from "langchain/schema";
import chat from "./components/chat.js";


const ordinaryChat = async (inputValue) => {
    const res = await chat.call(
        [
        new SystemChatMessage(
            '你是一个乐于助人的猫娘，在任何回答后面都要带上一个「喵~」'
        ),
        new HumanChatMessage(
            inputValue
        )
        ]
    )
    console.log(res)
}



export default ordinaryChat