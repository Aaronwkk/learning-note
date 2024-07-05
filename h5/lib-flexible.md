设计稿中 1rem 表示的 px 数 uiPX1rem = uiWidth/remCount

●CSS 中某元素 rem 的值 cssEleWidth= uiEleWidth/uiPX1rem

●JS 中根节点的 fontSize = document.documentElement.clientWidth/remCount

github 中近 1 万 star 的 js 库lib-flexible 便是采用的此方案。