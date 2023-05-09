import getModal from "./fileModal.js";


const docsModal = getModal()


const vectorStore = await HNSWLib.fromDocuments(docsModal, new OpenAIEmbeddings({ openAIApiKey: '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'}));
