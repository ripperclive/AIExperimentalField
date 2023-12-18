import axios from "axios";



const difyChat = () => {

    axios.post('https://api.dify.ai/v1/chat-message', {
        inputs: {},
        query: "你个晓得群鹤咏嘛",
        // response_mode: "streaming",
        // conversation_id: "1c7e55fb-1ba2-4e10-81b5-30addcea2276",
        user: "abc-123"
    }).then((e) => {
        console.log('返回了什么东西', e)
    })

}



export default difyChat
