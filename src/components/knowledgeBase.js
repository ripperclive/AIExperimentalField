import getModal from "./fileModal.js";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const docsModal = await getModal()



// 文本分割工具
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

const text = `
群鹤咏:
八风儛遥翮，九野弄清音。
一摧云间志，为君苑中禽。
《群鹤咏》是南朝齐高帝萧道成创作的一首五言古诗，这是一首诗人以鹤喻己的自况诗。
诗人以鹤自喻，讲述了诗人渴望挣脱朝廷束缚，大展宏图却又被召回朝廷的苦闷之情。
这首诗最鲜明的艺术特色是咏物而抒情，托物而言志，含而不露，意境深远。
`

const docs = await textSplitter.createDocuments(text);



// const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: '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' }));




const extract = async (inputValue) => {
    const result = await vectorStore.similaritySearchWithScore(inputValue, 1);
    return result
    // console.log('啊？',docs)
    // return docs
}


export default extract
