node^18.12.1
python^3.8




###  对比
通过memoryChat这个例子，发现很多方法都是类似的
比如：LLMChain和ConversationChain
二者都能根据一个语言模型构建一个链(chain),但是ConversationChain相对特殊一点，它可以记住聊天的上下文,以便后续使用，ConversationChain一般用于聊天机器人。
(😅 然而LLMChain也能接受一个为memory的参数,也有类似的功能，不是必传)


### 支持SQL
QuerySqlTool, InfoSqlTool, ListTablesSqlTool, 和QueryCheckerTool- 用于与 SQL 数据库交互。可以在一个SqlToolkit.
(😅 那也就是说不支持NOSQL？)