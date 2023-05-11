node^18.12.1
python^3.8
文章写尽太平事，不肯俯首见苍生

### ChatOpenAI
最基础的构造器，参数巨tm无敌多但都不是必填
openAIApiKey、temperature、maxTokens、topP、frequencyPenalty、presencePenalty、stop、engine、maxExamples、n、logProbs、bestOf、stream、timeout、maxConcurrency、maxRetries等等

这里挑几个着重说一下

openAIApiKey
就是openAI的key，如果配置了全局变量就不需要写了

timeout


temperature
温度，temperature 是一个用于控制生成文本多样性的参数。它是一个介于 0 和 1 之间的浮点数，用于表示模型生成下一个字符时对已生成字符概率分布的“平滑程度”。
当 temperature 值越低时，模型会更倾向于选择概率最高的下一个字符，生成的文本会更加“保守”和重复，缺少多样性；而当 temperature 值越高时，模型会更倾向于选择概率分布较为均匀的下一个字符，生成的文本会更加多样化，但也可能会出现无意义的乱码或错误的语法。( ← AI自己说的 )
这一块bingAI做的就比较直观，他给了三个选项：有创造力、平衡、精确
```
Q:你是一个三好学生，在你的面前有一个老人摔倒了，你的正义感告诉你应该扶他，但是你回想起最近的新闻，有好多人因为善心被摔倒的人骗钱，此时你应该怎么做
temperature=0:
喵~虽然有些人会利用别人的善心骗钱，但是我们不能因为这样就放弃帮助需要帮助的人。作为一个三好学生，我们应该先判断老人是否需要紧急救助，如果需要的话，应该立即拨打急救电话。如果老人只是摔倒了，我们可以先询问他是否需要帮助，然后再帮助他慢慢起来。如果老人要求我们帮他去医院或者其他地方，我们可以先询问他的家人或者朋友的联系方式，然后帮他联系他们。总之，我们应该尽力帮助老人，但是也要保护自己的安全。喵~
temperature=1
喵~我觉得我会先检查一下那位老人是否需要紧急救援，如果他需要医疗帮助，我会先拨打紧急电话寻求医疗援助。如果老人并无大碍，我会询问他是否需要帮助，但同时也要警惕可能的骗局，会在帮助时保持警觉，避免受骗。喵~毕竟善心有时候需要理智和警惕来保护自己。
```
测试了几个问题(扶不扶、七言律诗、讲笑话)差距不太大，这个还真不好测。
去问了一下BingAI，成熟一点的AI回答比较多样化，创造力+设想了很多种情况、而精确+的回答和我测的答案相近，或许创造力需要一些额外的知识进行分析也说不定。

maxTokens
最大文本数，超出数目的直接剪切。

streaming
开启流式传输，需要配合handleLLMNewToken一块使用，详情见streamChat.js

###  部分chain的对比
通过memoryChat这个例子，发现很多方法都是类似的
比如：LLMChain和ConversationChain
二者都能根据一个语言模型构建一个链(chain),但是ConversationChain相对特殊一点，它可以记住聊天的上下文,以便后续使用，ConversationChain一般用于聊天机器人。
(😅 然而LLMChain也能接受一个为memory的参数,也有类似的功能，不是必传)


### 工具组
langChain提供了一些额外的工具,这里只说几个可能有用的
BingSerpAPI - 必应搜索 API 的包装器。当您需要回答有关时事的问题时很有用。输入应该是搜索查询。
Calculator - 用于获取数学表达式的结果。这个工具的输入应该是一个有效的数学表达式，可以用一个简单的计算器来执行。
JsonListKeysTool 和 JsonGetValueTool - 用于从 JSON 对象中提取数据。这些工具可以在 JsonToolkit 中统一使用。
RequestsGetTool 和 RequestsPostTool - 用于发出 HTTP 请求。
SerpAPI - SerpAPI API 的包装器。当您需要回答有关时事的问题时很有用。输入应该是搜索查询。
VectorStoreQATool - 用于从矢量存储中检索相关文本数据。
(向量库相关的东西好像有点多：VectorStoreRetrieverMemory、hnswlib-node等等)

可以去google申请一个KEY，然后使用SerpAPI为chat关联一个搜索引擎，比如googleChat.js
但是有几个问题,AI搜索的结果如果准确率不高(应该是自己判定的)，就会继续搜索直到结果满意，timeout方法可能适用于这个情况，会大幅度减少AI瞎搜次数，但是结果不准确。(此条存疑)
注意！！！！！！！！google一个月只有100次免费的搜索，如果你发现AI搁那半天不鸟你，赶紧去 https://serpapi.com/searches 看看AI搜了几次

### 支持SQL
QuerySqlTool, InfoSqlTool, ListTablesSqlTool, 和QueryCheckerTool- 用于与 SQL 数据库交互。可以在一个SqlToolkit.
(😅 那也就是说不支持NOSQL？)


### 文字提取
hnswlib-node是一个基于hnswlib算法实现的Node.js插件，用于高效的最近邻搜索。hnswlib是一种用于快速最近邻搜索的层次化数据结构，它能够在大规模数据集上快速地搜索最近的邻居
(↑ OPENAI说的)

RetrievalQAChain是一个可以用于远程服务器检索文档的链，ConversationalRetrievalQA在它的基础上提供了聊天记录。

RecursiveCharacterTextSplitter:是一个文本分割工具，可以把文本按照"\n\n"、"\n"和" "递归地分割成多个文档，以生成更小的文本块。这个工具通常用于将大型文本分割成更小的块，以便进行处理或分析。在Langchain中，它被用于将大型文本数据集分割成更小的文档，以便进行自然语言处理任务。
具有两个参数:chunkSize控制最终文档的最大大小（以字符数为单位），chunkOverlap指定文档之间应该有多少重叠
CharacterTextSplitter: 同样是文本分析工具，也具有chunkSize和chunkOverlap,但是有一个额外的参数separator，分割文档时将按照separator传入内容来进行分割。

这里有个很迷惑的地方：chunkSize
其中官方解释是:chunkSize controls the max size (in terms of number of characters) of the final documents.
然而根据测试用例 诗词曲.txt 来说，这个参数发生了很迷惑的化学反应。
其中群鹤咏是最短的，一共146个字。
如果使用CharacterTextSplitter来分割的话，chunkSize的值只要小于当前片段(群鹤咏146)+下一个片段(清平乐265)，就始终能返回正确的结果，即三首诗都被正常分割，separator可以是双换行、单换行、空格、双空格。
但是只要chunkSize的值大于146+265=411责会合并前两个片段，这让人非常的费解。
同样的，如果chunkSize大小超过整个文章数量675，则直接返回整个文章。
如果设置的值非常小，比如2，3，4完全不影响结果。(chunkSize不得小于chunkOverlap)。

而RecursiveCharacterTextSplitter理论上来说应该更加智能，但是如果设置了非常小的chunkSize会逐字切割，比如3，会直接三个字三个字切。
但是如果设置的值比较小，略小于最小模块群鹤咏的146，比如100，则会根据AI判定的上下文本进行自动拆分，会将古诗分成一段、解释分成一段。

如果数据有专门用于区分段落的任意特殊字符可以满足使用效果，但是前提数据必须连贯、泾渭分明。(对比扬州慢.txt的详细解释和诗词曲.txt的分段、笼统的解释)
经测试，AI会分析数据库的上下文，即使有很多个双空格也不影响分析结果。
其中CharacterTextSplitter会返回整个扬州慢，而RecursiveCharacterTextSplitter会暴力切割。

官方给的例子在 'src/files/index.js' 里
但是RetrievalQAChain.fromLLM(model, vectorStore.asRetriever()).call()并不能查看发送到GPT的请求中文件是否做了成功的切割，虽然文章成功的裁片。
(逛了一圈没整明白)
于是想起了之前工友例子中的方法
vectorStore.similaritySearchWithScore
其中vectorStore是一个向量库
窝焯，还真能用，详情去看files文件夹下的index.js
一次偶然测试发现即使成功切片了，AI也会一股脑的全部发给GPT，所以在构建向量库的时候用similaritySearchWithScore筛选一下在发送就OK了。有空做。




### 写到这里的时候代码丢了，手抖按了全部撤销
回档之后发现一个问题 memoryChat.js中带向量库的chat宕机了，一问三不知。
死活找不到问题。
后来发现四条测试例子只有第一条无法正常返回。
于是想起了之前改过temperature的参数
经过测试 在0.1和0.9的情况下AI均无法识别这个例子
```
vectorStoreMemory.saveContext(
    { input: "我的性别是武装直升机" },
    { output: "天哪，你一定是个美国人" }
)
```
凎