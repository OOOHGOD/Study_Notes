> 提醒一下：AI 可以帮助我们参考优秀网站的布局、配色、字体、结构和设计思路，但不建议大家把别人的网站、品牌素材、图片和文案原封不动照搬下来。更合理的方式，是借鉴设计思路，再通过 AI 改成自己的品牌和内容。

---
[Claude AI怎么做网站？从AI生成网页到导入WordPress完整教程 | AI有风 - 国外网上赚钱常用工具网站大全、网赚网址导航](https://aiyoufeng.com/wordpress-website-with-claude)
[ChatGPT Codex AI建站完整教程：一张图克隆WordPress Elementor网站 | AI有风 - 国外网上赚钱常用工具网站大全、网赚网址导航](https://aiyoufeng.com/chatgpt-wordpress-elementor)
### 提示词1：

> 请仔细分析我上传的网站设计稿，并根据这个设计生成一个完整的单页 Landing Page 网站。网站需要包含导航菜单中提到的所有页面板块。请尽可能还原原设计的布局结构、字体、字号、配色、间距、按钮样式、图片风格以及整体视觉氛围，并确保所有板块保持统一的设计语言和视觉风格。使用 HTML、Tailwind CSS 和 JavaScript 完整制作这个网站。

---


### 提示词2：

> 请将这个完整的 HTML 网站转换成可以直接导入 Elementor 的 JSON 模板。制作时尽量使用 Elementor 原生组件和容器，只有在原生组件无法实现某些效果时，才使用 Text Editor 或 HTML Widget。
> 
> 请完整保留原网站的布局、字体、颜色、间距、图片、按钮、响应式效果和整体视觉风格，最终效果需要尽可能与原 HTML 网站一模一样。
> 
> 如果 Elementor 本身无法实现某些样式，请单独整理出所需的额外 CSS 代码，并注明需要粘贴到 WordPress 的 Additional CSS / 自定义 CSS 中。
> 
> 最后，将 Elementor JSON 模板、CSS 文件、图片资源以及其他 WordPress 所需文件全部整理到一个新的文件夹中，方便我直接导入和使用。

---

## 一、先找一个你喜欢的网站作为参考

第一步其实很简单，就是先找一个你喜欢的网站。

比如你准备做科技公司官网、外贸企业官网、通信设备网站或者其他企业网站，都可以先去找一些同行或者海外做得比较好的网站。

你甚至可以直接问 ChatGPT：

**“帮我找几个海外设计感比较强、比较高端的科技公司官网。”**

然后从 AI 推荐的网站里面，挑一个你觉得设计比较好的。

我们主要参考它的：

- 页面布局
- 字体
- 配色
- 图片风格
- 首页结构
- 导航菜单
- 产品或者服务展示方式

确定参考网站之后，下一步就是把整个网页保存下来。

---

# 二、用 GoFullPage 把整个网站截图下来

普通电脑截图通常只能截当前屏幕，如果一个网页非常长，从顶部一直到最下面有很多内容，一张一张截图会比较麻烦。

这里可以使用 Chrome 浏览器插件 **GoFullPage**。

GoFullPage：

👉 [https://chromewebstore.google.com/detail/gofullpage-beta-full-page/kehafhfdnkhdgbnpeofmhmbibmpnjaof](https://chromewebstore.google.com/detail/gofullpage-beta-full-page/kehafhfdnkhdgbnpeofmhmbibmpnjaof)

安装以后，把插件固定到 Chrome 浏览器顶部。

打开你准备参考的网站，然后点击 GoFullPage，它会自动从网页顶部一直往下滚动，把整个页面完整截下来。

完成以后，把图片下载到电脑。

这张图片接下来就是我们提供给 Codex 的网站参考图。

---

# 三、打开 ChatGPT Codex，新建网站项目

接下来打开 ChatGPT。

在支持 Codex 的 ChatGPT 客户端或者相关界面中，进入 **Codex**，然后新建一个项目。

建议把项目文件保存在本地电脑。

例如我可以在 D 盘新建一个文件夹：

**Codex网站**

以后 AI 帮我们生成的 HTML、CSS、JavaScript、图片以及其他网站文件，都可以直接放在这个文件夹里面。

项目创建完成以后，新建聊天，然后把刚才通过 GoFullPage 截取的网站图片上传进去。

如果你需要升级 ChatGPT 会员，可以直接通过 ChatGPT 官方渠道订阅。

如果你的支付方式不方便，也有人会使用第三方 AI 会员服务平台。比如：

**银河录像局：ChatGPT AI 会员代充 / AI 账号服务**

👉 [https://nf.video/C1dxn](https://nf.video/C1dxn)

第三方服务并非 OpenAI 官方服务，购买前建议大家自行确认账号、支付方式和售后规则。

---

# 四、让 Codex 根据参考图生成完整网站

图片上传完成之后，我们就可以开始给 Codex 下指令。

可以先使用下面这段提示词：

> 请仔细分析我上传的网站参考图，并根据这个设计生成一个完整的网站。
> 
> 网站需要包含导航菜单中涉及的主要页面和板块。
> 
> 请尽可能还原参考设计中的整体布局、字体、颜色、间距和视觉风格。
> 
> 使用 HTML、CSS 和 JavaScript 完成网站制作，并确保网站结构清晰，方便后续继续修改。

发送以后，Codex 就会开始分析图片并生成网站代码。

网站比较简单的话速度会快一些，如果参考页面很长、板块很多，生成时间自然也会更长。

等 AI 完成之后，你会在项目文件夹里面看到生成好的网站文件。

通常首页会有类似：

**index.html**

这样的文件。

右键选择使用 Chrome 浏览器打开，就可以直接预览网站效果。

---

# 五、AI 生成的网站效果不好怎么办？

第一次生成出来以后，不需要指望它一次就百分之百完美。

实际上使用 AI 做网站最重要的一个思路就是：

**先生成，再修改。**

比如：

- 某个板块位置不对
- 字体太大
- 图片不好看
- 导航菜单需要修改
- 品牌名称不对
- 页面颜色需要调整
- 想增加动画
- 手机端显示有问题

都可以直接继续和 Codex 对话。

例如：

> 把网站品牌名称修改成 WINDY。
> 
> 我的公司主要销售通信设备，请同时修改网站里面的相关文案和图片，让整个网站更符合通信科技公司的品牌定位。

AI 就会继续修改当前项目里面的代码。

所以不会代码其实也没有太大关系。

你只需要学会告诉 AI：

**哪里有问题，以及你想改成什么样。**

---

# 六、用 OpenArt 给网站生成更专业的 AI 图片

Codex 虽然可以负责网站代码，但真正决定一个企业网站看起来高不高级的，还有一个非常重要的东西：

**图片。**

如果网站原来的参考图不能直接使用，我们完全可以让 AI 重新生成。

我比较常用的是 **OpenArt**。

👉 [http://bit.ly/3UunTl6](http://bit.ly/3UunTl6)

OpenArt 是一个一站式 AI 图片和 AI 视频生成平台，它把很多主流的图片、视频模型集中在一个平台里面。

这样做的好处就是，你不用为了不同模型来回注册很多网站。

例如我们做的是一家科技公司，就可以让 AI 生成：

- 科技公司办公楼
- 通信设备
- 数据中心
- 企业团队办公场景
- 产品展示图
- 科技感背景
- 网站 Hero 主视觉图片

然后让 Codex 把这些图片重新替换到网站里面。

如果你经常需要给网站、YouTube 封面、产品图或者视频生成 AI 素材，可以直接看看 OpenArt：

👉 **OpenArt AI 图片 / 视频生成平台**  
[http://bit.ly/3UunTl6](http://bit.ly/3UunTl6)

---

# 七、把 OpenArt 接入 ChatGPT

如果你的 ChatGPT 环境支持插件、连接器或者 MCP 等扩展能力，还可以尝试把 OpenArt 接进 ChatGPT。

这样以后就不一定每次都要：

ChatGPT → OpenArt → 下载图片 → 再上传 ChatGPT。

而是可以直接告诉 ChatGPT：

**“帮我生成一张科技公司网站 Hero 图片。”**

然后让连接的图片生成服务帮你完成。

具体能够使用哪些连接方式，要以你当前 ChatGPT 和 OpenArt 账号实际显示的功能为准。

这样做网站的效率会更高。

---

# 八、网站做好以后，需要购买服务器和域名

现在我们在电脑本地已经可以打开网站了。

但目前这个网站只有你自己能看到。

如果想让客户通过：

**[www.你的域名.com](http://www.xn--6qqv7i2xdt95b.com/)**

访问网站，就需要把网站部署到服务器。

如果你的客户主要来自美国、欧洲或者其他海外市场，我比较建议选择海外服务器。

这次我使用的是 **Hostinger**。

👉 [https://bit.ly/3BysRqP](https://bit.ly/3BysRqP)

Hostinger 比较适合新手的一个原因，是它的后台相对简单，不像很多传统服务器后台一样，第一次进去完全不知道该点哪里。

即使以前没有做过网站，也比较容易上手。

---

# 九、Hostinger 套餐怎么选？

进入 Hostinger：

👉 [https://bit.ly/3BysRqP](https://bit.ly/3BysRqP)

选择网站主机之后，会看到不同套餐。

如果只是刚开始做一个企业网站，而且访问量并不大，其实普通的虚拟主机或者共享主机已经可以满足需求。

如果以后：

- 网站访问量越来越大
- 同时运行很多网站
- 对服务器性能要求更高
- 希望拥有更独立的服务器资源

再考虑 VPS 或者更高级别的[云主机](https://aiyoufeng.com/sitetag/%e4%ba%91%e4%b8%bb%e6%9c%ba "查看与 云主机 相关的文章")也可以。

Hostinger 不同套餐在以下方面通常会有所区别：

- 可以建立的网站数量
- 存储空间
- NVMe / SSD 存储
- 自动备份
- CPU 资源
- 独立 IP
- 免费域名
- 性能限制

具体套餐配置和价格会随着 Hostinger 活动发生变化，所以大家直接以购买页面显示的信息为准。

👉 **查看 Hostinger 当前优惠和套餐：**  
[https://bit.ly/3BysRqP](https://bit.ly/3BysRqP)

如果你准备长期运营企业官网，一般购买时间越长，平均下来的月费会更便宜。

另外，符合活动条件的长期套餐通常还会提供首年域名优惠或者免费域名，具体以页面当前显示规则为准。

---

# 十、在 Hostinger 一键安装 WordPress

服务器购买完成以后，进入 Hostinger 后台。

找到：

**网站 → 添加网站 → WordPress**

然后开始创建 WordPress 网站。

WordPress 是目前非常主流的网站内容管理系统之一。

我们这里之所以使用 WordPress，是因为后面可以配合 Elementor，把 Codex 做出来的网站变成一个可以可视化编辑的网站。

如果暂时还没有想好正式域名，也可以先使用 Hostinger 提供的临时域名把网站搭起来。

等网站全部做好之后，再连接自己的正式域名。

创建 WordPress 时需要设置：

**管理员邮箱**

和：

**WordPress 后台密码**

这两个一定要保存好。

以后登录 WordPress 后台都会用到。

---

# 十一、安装 Astra WordPress 主题

WordPress 安装完成以后，进入后台。

点击：

**外观 → 主题 → 安装主题**

搜索：

**Astra**

安装并启用。

Astra 是一个非常主流的 WordPress 主题，而且和 Elementor 搭配起来比较方便。

我们的主要页面实际上还是会通过 Elementor 来完成，Astra 更多是作为网站的基础主题框架。

---

# 十二、安装 Elementor 页面构建器

接下来进入：

**插件 → 安装插件**

搜索：

**Elementor**

安装完成以后记得点击：

**启用。**

Elementor 最大的优势，就是它可以让我们通过拖拽的方式修改网站。

比如：

- 修改文字
- 换图片
- 修改按钮
- 调整字体
- 改颜色
- 调整页面间距
- 移动模块
- 增加页面

以后基本不需要每次修改一点内容都让 AI 重写整个网站。

如果你后续需要更多高级组件、主题构建器、动态内容等功能，也可以考虑 Elementor Pro：

👉 **Elementor Pro：WordPress 页面构建器**  
[https://bit.ly/49KRNsA](https://bit.ly/49KRNsA)

---

# 十三、让 Codex 把 HTML 转成 Elementor 模板

现在最关键的一步来了。

我们前面生成的是一个普通 HTML 网站。

虽然页面已经做好，但是如果直接上传 HTML，以后自己修改起来还是没有 Elementor 方便。

所以接下来我们需要继续告诉 Codex：

> 请把当前完整 HTML 网站转换成可以导入 WordPress Elementor 使用的 JSON 模板。
> 
> 制作过程中尽可能使用 Elementor 原生组件和 Container。
> 
> 同时把 Elementor JSON 模板、CSS 文件、图片资源以及其他需要使用的文件整理到一个文件夹中，方便我直接导入 WordPress 使用。

这里需要特别注意几个专业术语：

**HTML**：网页结构

**CSS**：网页样式

**JavaScript**：网页交互

**JSON**：Elementor 模板常见的数据格式之一

**Elementor Container**：Elementor 当前常用的页面布局方式之一

如果第一次 Codex 给你的导入方式太复杂，也可以继续告诉它：

> 不需要额外插件，请尽量只使用 Elementor JSON 模板和额外 CSS 的方式实现，让导入步骤尽可能简单。

我实际操作下来，这种方式对于新手会更加直观。

---

# 十四、把 Elementor JSON 模板导入 WordPress

回到 WordPress 后台。

进入：

**页面 → 新建页面**

页面名称可以直接写：

**首页**

然后点击：

**使用 Elementor 编辑。**

进入 Elementor 后，再打开页面设置。

把页面布局设置成：

**Elementor Canvas（Elementor 画布）**

或者：

**Elementor Full Width（Elementor 全宽）**

然后打开 Elementor 的模板库，选择上传模板。

把 Codex 给你生成的：

**JSON 模板文件**

上传进去。

上传完成以后点击：

**插入。**

这个时候你可能会发现：

**页面结构出来了，但是样式很乱。**

先不要着急。

因为我们的 CSS 还没有加进去。

---

# 十五、把 Codex 生成的 CSS 加入 WordPress

接下来打开 Codex 生成的 CSS 文件。

复制里面全部代码。

然后进入 WordPress 可以添加额外 CSS 的位置，把代码粘贴进去并保存。

CSS 加进去以后，网站的：

- 字体
- 颜色
- 间距
- 板块位置
- 页面宽度
- 按钮样式
- 图片布局

才会真正恢复。

如果加入 CSS 以后页面还是乱的，也不用自己研究半天。

最简单的方法就是：

**截图。**

然后把截图发给 Codex。

告诉它：

> 我已经把你生成的 Elementor JSON 模板和 CSS 导入 WordPress，但是现在页面显示成这样，请分析问题并重新生成可以正常使用的 CSS。

让 AI 自己检查。

我在整个建站过程中遇到不少小问题，很多最后都是通过：

**截图 → 发给 AI → 让 AI 修复**

解决的。

---

# 十六、启用 Elementor Container

如果你的 Elementor 后台里有相关编辑器实验功能或者新旧编辑器选项，可以根据当前 Elementor 版本实际情况设置。

其中比较重要的是：

**Container 容器布局。**

启用之后，Elementor 就可以更方便地使用 Flexbox、Grid 等方式控制页面。

以后如果想修改：

- 图片
- 文字
- 按钮
- 板块宽度
- 左右位置
- 上下间距

都会方便很多。

所以我们最开始用 AI 写代码，最后还是把网站转换到了一个：

**可以自己拖拽修改的 WordPress Elementor 网站。**

这也是我比较推荐这套工作流的原因。

---

# 十七、把刚才制作的页面设置成网站首页

很多新手做到这里，会遇到一个问题：

明明首页已经做好了，但是打开域名以后，看到的还是 WordPress 原来的页面。

这是因为还没有设置主页。

进入：

**设置 → 阅读**

找到：

**您的主页显示**

选择：

**一个静态页面**

然后主页选择：

**首页**

保存。

再次刷新网站，就可以看到我们通过 AI 制作的新首页了。

---

# 十八、连接正式域名

如果前面使用的是临时域名，网站做好以后就可以换成自己的正式域名。

回到 Hostinger：

👉 [https://bit.ly/3BysRqP](https://bit.ly/3BysRqP)

进入：

**网站**

找到刚才创建的 WordPress 网站。

然后选择连接域名。

输入准备使用的正式域名，根据后台提示完成绑定。

如果域名本身也是在 Hostinger 注册的，一般操作会更加简单。

域名连接以后还需要等待 DNS 解析生效。

有时候几分钟就可以，有时候会更久，所以刚连接完成以后，如果网站暂时打不开，不一定代表哪里设置错了。

耐心等待 DNS 完成解析即可。

---

# 十九、这套 AI 建站方法到底适合什么人？

我觉得这种：

**参考网站 → ChatGPT Codex → HTML → WordPress → Elementor**

的工作流，特别适合下面几类人。

### 1. 不会写代码，但想自己建网站

以前最麻烦的是，你有想法，但是不知道怎么把它做出来。

现在只需要截图，然后告诉 AI 想要什么。

### 2. 做外贸或者跨境电商的企业

如果你有自己的工厂、品牌或者产品，可以找海外同行比较优秀的网站作为设计参考，再让 AI 帮你改成自己的品牌网站。

如果你准备直接做跨境电商独立站，也可以使用 Shopify：

👉 [https://shopify.pxf.io/BnBxny](https://shopify.pxf.io/BnBxny)

### 3. 网站设计师和自由职业者

AI 可以大幅缩短制作 Demo 和初稿的时间。

如果你自己不会完成某些英文工作、文案、开发或者设计任务，也可以通过 **Fiverr** 找自由职业者协助完成：

👉 [https://bit.ly/4c9cttG](https://bit.ly/4c9cttG)

### 4. 做企业官网的人

传统企业官网其实很适合 AI。

因为大多数企业站无非就是：

首页 + 关于我们 + 产品 + 服务 + 联系方式 + 案例。

AI 完全可以先帮你把网站结构和第一版设计快速做出来。

---

# 二十、AI 建站以后怎么做 SEO？

网站做出来只是第一步。

如果后面希望别人通过 Google 搜索找到你，还需要做 SEO。

其中包括：

- 关键词研究
- 网站标题优化
- Meta Description
- 页面结构
- H1、H2、H3
- 网站速度
- 内部链接
- 外部链接
- 图片 ALT
- 内容更新
- 竞争对手分析

如果你准备认真做 Google SEO，可以使用 **Semrush** 分析网站和竞争对手数据：

👉 [https://bit.ly/3TfIaNK](https://bit.ly/3TfIaNK)

例如你可以查看：

竞争对手靠哪些关键词获得 Google 流量，他们哪些页面排名最好，有哪些外链，以及哪些关键词比较值得我们去做。

---

# 二十一、除了 Codex，还有什么 AI 建站工具？

如果你觉得：

**HTML → WordPress → Elementor**

这一套流程还是稍微复杂了一点，也可以尝试直接使用专门的 AI 应用和网站生成平台。

例如 **Lovable**：

👉 [http://bit.ly/4ob4naJ](http://bit.ly/4ob4naJ)

Lovable 更适合通过自然语言直接生成：

- 网站
- Web App
- SaaS
- 管理后台
- 在线工具
- MVP 产品

所以不同工具的定位并不完全一样。

如果你的目标是：

**做一个 WordPress 企业网站**

那 Codex + WordPress + Elementor 这一套会更灵活。

如果你的目标是：

**快速做一个 Web App 或者 AI 应用**

那 Lovable 这种专门的 AI 应用生成工具会更加直接。

---

# 总结：现在不会代码，也可以用 AI 做出专业网站

整个流程其实可以总结成：

**第一步：** 找一个喜欢的网站作为设计参考。

**第二步：** 使用 GoFullPage 截取完整网页。

**第三步：** 把参考图上传给 ChatGPT Codex。

**第四步：** 让 Codex 生成 HTML + CSS + JavaScript 网站。

**第五步：** 使用 OpenArt 重新生成符合自己品牌的图片。

**第六步：** 让 Codex 把 HTML 网站转换成 Elementor JSON 模板。

**第七步：** 在 Hostinger 安装 WordPress、Astra 和 Elementor。

**第八步：** 导入 Elementor JSON 和 CSS。

**第九步：** 通过 Elementor 修改网站内容。

**第十步：** 连接正式域名上线。

以前这些步骤可能需要设计师、程序员、服务器运维几个人一起配合，现在很多工作都可以交给 AI 完成。

如果你也准备跟着这篇教程自己做一个网站，可以先把下面几个工具准备好：

### Hostinger：网站服务器和域名

👉 [https://bit.ly/3BysRqP](https://bit.ly/3BysRqP)

### Elementor Pro：WordPress 页面构建器

👉 [https://bit.ly/49KRNsA](https://bit.ly/49KRNsA)

### OpenArt：AI 图片 / AI 视频生成平台

👉 [http://bit.ly/3UunTl6](http://bit.ly/3UunTl6)

### ChatGPT AI 会员代充 / AI 服务平台

👉 [https://nf.video/C1dxn](https://nf.video/C1dxn)

### GoFullPage：完整网页截图插件

👉 [https://chromewebstore.google.com/detail/gofullpage-beta-full-page/kehafhfdnkhdgbnpeofmhmbibmpnjaof](https://chromewebstore.google.com/detail/gofullpage-beta-full-page/kehafhfdnkhdgbnpeofmhmbibmpnjaof)

### Fiverr：海外自由职业者外包平台

👉 [https://bit.ly/4c9cttG](https://bit.ly/4c9cttG)

### Shopify：搭建跨境电商独立站

👉 [https://shopify.pxf.io/BnBxny](https://shopify.pxf.io/BnBxny)

### Semrush：Google SEO 和网站数据分析

👉 [https://bit.ly/3TfIaNK](https://bit.ly/3TfIaNK)

### Lovable：AI 生成网站和 Web App

👉 [http://bit.ly/4ob4naJ](http://bit.ly/4ob4naJ)

### NOVAMIRA插件：elementor页眉页脚编辑（让codex与wordpress连接通信）
👉 https://novamira.ai