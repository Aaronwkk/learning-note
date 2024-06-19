[聊聊前端字符编码：ASCII、Unicode、Base64、UTF-8、UTF-16、UTF-32](https://www.51cto.com/article/745100.html)

JavaScript 编解码

URL 只能包含标准的 ASCII 字符，所以必须对其他特殊字符进行编码。在 JavaScript 中，可以通过了以下方法对 URL 来做 UTF-8 编码与解码：

encodeURI​、decodeURI
encodeURIComponent​、decodeURIComponent
这里的编码指的就是将二进制数据转换为 ASCII 格式的方式，解码反之亦然，即将 ASCII 格式转换回原始内容。

那 encodeURI​ 和 encodeURIComponent 有什么区别呢？

encodeURI 用于编码完整的 URL：

需要注意，有 11 个字符不能使用 encodeURI​ 编码，而需要使用 encodeURIComponent 进行编码：#$&+,:;=?@

需要注意，encodeURIComponent​ 不编码 - _ . ! ~ * ' ( )。如果要对这些字符进行编码，则必须将它们替换为相应的 UTF-8 字符序列：


`encodeURI`和`encodeURIComponent`是JavaScript中用于编码URL的两个函数，它们的主要区别在于编码的范围和目的，使用时应根据具体场景来选择：

1. **encodeURI**：
   - **用途**：主要用于对整个URI（包括协议、主机名、路径等）进行编码，但不会对URI中已编码的部分再次编码，也不会编码URI保留字符（如：:/?#[]@!$&'()*+,;=）。
   - **适用场景**：当你需要编码整个URL，但希望保留URI结构中的特殊字符（如用于分隔路径和查询参数的字符）时使用。例如，当你构建一个完整的URL准备赋值给`window.location.href`时。

2. **encodeURIComponent**：
   - **用途**：用于对URI组件中的某个部分进行编码，特别是对查询字符串参数值进行编码。它会对除了`- _ . ! ~ * ' ( )`之外的所有字符进行编码，确保这些字符在作为URI组件一部分时不会引起解析问题。
   - **适用场景**：当你需要编码URL中的一部分，尤其是用户提供的输入数据（如表单数据、搜索关键词等），以防止特殊字符干扰URI的正确解析时使用。例如，构建GET请求的查询字符串参数时。

**总结**：
- 如果你需要编码整个网址（包括协议和域名），并且不想破坏URI本身的结构，使用`encodeURI`。
- 如果你只是需要编码URL中的某个特定部分，比如查询字符串的值，以确保它们适合作为URI组件，使用`encodeURIComponent`。

正确的使用这两个函数可以确保你的应用程序生成的URL能够被各种服务器和客户端正确解析，避免因特殊字符引起的错误或安全漏洞。