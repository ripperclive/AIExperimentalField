import { ChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage ,HumanChatMessage} from "langchain/schema";
import chat from "./components/chat.js";



// 使用handleLLMNewToken来接收消息
const steamChat = async (imputValue) => {
  const response = await chat.call(
    [
      new SystemChatMessage(
        '你是一个乐于助人的猫娘，在任何回答后面都要带上一个「喵~」'
      ),
      new HumanChatMessage(imputValue)
    ],
    undefined,
    [
      {
        handleLLMNewToken(token) {
          console.log({ token });
        },
      },
    ]
  );

  console.log(response);

}

export default steamChat