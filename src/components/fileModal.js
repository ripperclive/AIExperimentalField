import * as fs from 'fs'
import * as path from 'path'
import { TextLoader } from "langchain/document_loaders/fs/text";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";


// 这里直接牛了工友的代码
const directoryPath = "./src/files";

const loadDocs = async (filePath) => {
  const extname = path.extname(filePath);
  let loader;

  switch (extname) {
    case ".txt":
      loader = new TextLoader(filePath);
      break;
    case ".json":
      loader = new JSONLoader(filePath);
      break;
    case ".pdf":
      loader = new PDFLoader(filePath);
      break;
    case ".docx":
      loader = new DocxLoader(filePath);
      break;
    default:
      console.log(`Unsupported file type: ${extname}`);
      return [];
  }

  return loader.load();
};

const loadAllDocs = async () => {
  const files = fs.readdirSync(directoryPath);
  const promises = files.map(async file => {
    const filePath = path.join(directoryPath, file);
    return loadDocs(filePath);
  });
  const docsArray = await Promise.all(promises);
  return docsArray.flat();
};

let docsModal = await loadAllDocs();

docsModal = docsModal.map(item=>{
  // 单独处理pdf文件中的大量的\n
  if (item?.metadata?.pdf){
    const newItem = {...item};
    newItem.pageContent = newItem.pageContent.replace(/\n/g, '');
    console.log(newItem);
    return newItem;
  }
  return item;
});


// console.log(docsModal)

const getModal = async()=>{
    return await docsModal
}

export default getModal