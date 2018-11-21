<template>
  <div id="app">
    <!-- 头部 -->
    <HeaderNav/>
    <!-- 主体内容 -->
    <div id="content">
      <!-- 左侧边栏 -->
      <AsideNav/>
      <!-- 右侧内容 -->
      <div id="aside-content">
        <router-view />
      </div>
    </div>

  </div>
</template>
<script>
import HeaderNav from '@/views/HeaderNav';
import AsideNav from '@/views/AsideNav'
export default {
    name: "app",
    components: {
        HeaderNav,
        AsideNav
    }
};
</script>

<style lang="less">
/* http://meyerweb.com/eric/tools/css/reset/ 
       v2.0 | 20110126
       License: none (public domain)
    */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}
body {
    line-height: 1;
}
ol,
ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
    content: "";
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
body,
html {
    width: 100%;
    height: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    position: relative;
    display:flex;
    flex-direction: column;
    #content {
      width:100%;
      flex:1;
      display:flex;
      #aside-content{
        flex:1;
      }
    }
}

@media screen and (max-width: 415px) {
    .el-dialog {
        width: 80%;
    }
}
@media screen and (min-with: 415px) and (max-width: 723px) {
    .el-dialog {
        width: 60%;
    }
}
@media screen and (min-width: 1024px) and (max-width: 1366px) {
    .el-dialog {
        width: 30%;
    }
}
@media screen and (min-width: 1366px) {
    .el-dialog {
        width: 20%;
    }
}
</style>
