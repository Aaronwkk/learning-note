

#### cookie 是不能跨域的 

这句话是对的，但需要补充一些细节来完整理解这一概念。

Cookie 本身是遵循同源策略的，这意味着默认情况下，一个域名下的Cookie不能被其他域名访问，这是为了保护用户的隐私和安全。这就是所谓的“不能跨域”。

然而，有几种情况可以让Cookie实现一定程度上的跨域共享：

1. **domain属性**：通过设置Cookie时的`domain`属性，可以使Cookie在指定的域名及其子域名间共享。例如，如果一个Cookie的`domain`设置为`.example.com`，那么这个Cookie不仅能被`www.example.com`访问，也能被`sub.example.com`访问。

2. **SameSite属性**：这是一个相对新的属性，用于控制浏览器在跨站请求时是否发送Cookie。有三个可能的值：`Strict`（最严格，完全禁止跨域发送）、`Lax`（部分跨域场景下允许）和`None`（允许跨域发送，但需要配合`Secure`属性在HTTPS环境下使用）。

3. **withCredentials 属性**：在使用Ajax或Fetch API进行跨域请求时，通过设置`withCredentials`为`true`，可以让浏览器在跨域请求中携带Cookies。但这也需要服务器端明确允许这种跨域凭据（credentials）的传递。

综上所述，虽然默认情况下Cookie不能跨域，但通过特定的配置和技术手段，可以在一定条件下实现跨域访问。

Cookie 的设置

那 Cookie 是怎么设置的呢？简单来说就是

客户端发送 HTTP 请求到服务器
当服务器收到 HTTP 请求时，在响应头里面添加一个 Set-Cookie 字段
浏览器收到响应后保存下 Cookie
之后对该服务器每一次请求中都通过 Cookie 字段将 Cookie 信息发送给服务器。

Cookie 的查看

尽管我们在浏览器里查看到了 Cookie，这并不意味着 Cookie 文件只是存放在浏览器里的。实际上，Cookies 相关的内容还可以存在本地文件里，就比如说 Mac 下的 Chrome，存放目录就是 ~/Library/Application Support/Google/Chrome/Default，里面会有一个名为 Cookies 的数据库文件，你可以使用 sqlite 软件打开它：

Cookies 的属性

Name/Value
用 JavaScript 操作 Cookie 的时候注意对 Value 进行编码处理。

Expires
Expires 用于设置 Cookie 的过期时间。比如：

Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
当 Expires 属性缺省时，表示是会话性 Cookie，像上图 Expires 的值为 Session，表示的就是会话性 Cookie。当为会话性 Cookie 的时候，值保存在客户端内存中，并在用户关闭浏览器时失效。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。

与会话性 Cookie 相对的是持久性 Cookie，持久性 Cookies 会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。

Max-Age
Max-Age 用于设置在 Cookie 失效之前需要经过的秒数。比如：

Set-Cookie: id=a3fWa; Max-Age=604800;
Max-Age 可以为正数、负数、甚至是 0。

如果 max-Age 属性为正数时，浏览器会将其持久化，即写到对应的 Cookie 文件中。

当 max-Age 属性为负数，则表示该 Cookie 只是一个会话性 Cookie。

当 max-Age 为 0 时，则会立即删除这个 Cookie。

假如 Expires 和 Max-Age 都存在，Max-Age 优先级更高。

Domain
Domain 指定了 Cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）。

像淘宝首页设置的 Domain 就是 .taobao.com，这样无论是 a.taobao.com 还是 b.taobao.com 都可以使用 Cookie。

在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：

Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT
Path
Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置 Path=/docs，/docs/Web/ 下的资源会带 Cookie 首部，/test 则不会携带 Cookie 首部。

Domain 和 Path 标识共同定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。

Secure属性
标记为 Secure 的 Cookie 只应通过被HTTPS协议加密过的请求发送给服务端。使用 HTTPS 安全协议，可以保护 Cookie 在浏览器和 Web 服务器间的传输过程中不被窃取和篡改。

HTTPOnly
设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。

SameSite
SameSite 是最近非常值得一提的内容，因为 2 月份发布的 Chrome80 版本中默认屏蔽了第三方的 Cookie，这会导致阿里系的很多应用都产生问题，为此还专门成立了问题小组，推动各 BU 进行改造。

作用
我们先来看看这个属性的作用：

SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。

属性值
SameSite 可以有下面三种值：

Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
Lax 允许部分第三方请求携带 Cookie
None 无论是否跨站都会发送 Cookie
之前默认是 None 的，Chrome80 后默认是 Lax。

跨域和跨站
首先要理解的一点就是跨站和跨域是不同的。同站(same-site)/跨站(cross-site)」和第一方(first-party)/第三方(third-party)是等价的。但是与浏览器同源策略（SOP）中的「同源(same-origin)/跨域(cross-origin)」是完全不同的概念。

同源策略的同源是指两个 URL 的协议/主机名/端口一致。例如，https://www.taobao.com/pages/...，它的协议是 https，主机名是 www.taobao.com，端口是 443。

同源策略作为浏览器的安全基石，其「同源」判断是比较严格的，相对而言，Cookie中的「同站」判断就比较宽松：只要两个 URL 的 eTLD+1 相同即可，不需要考虑协议和端口。其中，eTLD 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，.com、.co.uk、.github.io 等。eTLD+1 则表示，有效顶级域名+二级域名，例如 taobao.com 等。

举几个例子，www.taobao.com 和 www.baidu.com 是跨站，www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站(注意是跨站)。



![](./img/samesite.png)

[cookie 的详细介绍](https://github.com/mqyqingfeng/Blog/issues/157)