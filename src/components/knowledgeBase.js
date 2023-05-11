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


清平乐·留人不住:
留人不住，醉解兰舟去。一棹碧涛春水路，过尽晓莺啼处。
渡头杨柳青青，枝枝叶叶离情。此后锦书休寄，画楼云雨无凭。
《清平乐·留人不住》是北宋词人晏几道创作的一首词。
这是一首描写离情别怨的词作，写了女子对情人的依依不舍之情。
上片用白描手法写春晨渡口分手时的种种情态：行者去意已决，送者依依不舍。
下片以女子决绝之语作结，以怨写爱，抒写女子因多情而生绝望，恰表明不忍割舍的矛盾情怀。
这首词运用了多组对比，塑造出一个意浅，一个情深两个形象，结构上，先含情脉脉，后决绝断念，刻画细腻，更反衬出词人的一片痴情。


山坡羊·潼关怀古:
峰峦如聚，波涛如怒，山河表里潼关路。
望西都，意踌躇。伤心秦汉经行处，宫阙万间都做了土。
兴，百姓苦；亡，百姓苦！
《山坡羊·潼关怀古》是元曲作家张养浩的散曲作品。
此曲抚今追昔，由历代王朝的兴衰引到人民百姓的苦难，一针见血地点出了封建统治与人民的对立，表现了作者对历史的思索和对人民的同情。
全曲采用的是层层深入的方式，由写景而怀古，再引发议论，将苍茫的景色、深沉的情感和精辞的议论三者完美结合，具有强烈的感染力，字里行间中充满着历史的沧桑感和时代感，既有怀古诗的特色，又有与众不同的沉郁风格。`


const docs = await textSplitter.createDocuments(text);



// const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: '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' }));




const extract = async (inputValue) => {
    // const result = await vectorStore.similaritySearchWithScore(inputValue, 1);
    console.log('啊？',docs)
    return docs
}


export default extract
