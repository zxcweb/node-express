<template>
  <div id="app">
    <!-- 头部 -->
    <HeaderNav />
    <!-- 主体内容 -->
    <div id="content">
      <!-- 左侧边栏 -->
      <AsideNav />
      <!-- 右侧内容 -->
      <div id="aside-content" v-loading="loading">
        <transition name="nav" mode="in-out">
          <router-view/>
        </transition>
      </div>
    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex';
import HeaderNav from "@/views/HeaderNav/HeaderNav";
import AsideNav from "@/views/AsideNav/AsideNav";
export default {
  name: "app",
  data(){
    return {
    }
  },
  computed:mapState(['loading']),
  components: {
    HeaderNav,
    AsideNav
  },
  watch: {
    $route(){
      this.$store.commit("loading",{flag:true});
    }
  }
};
</script>

<style lang="less">
@import "~@/assets/css/reset.less";
@import "~@/assets/css/media.less";
body,
html {
  width: 100%;
  height: 100%;
  color: #666;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  #content {
    width: 100%;
    flex: 1;
    display: flex;
    #aside-content {
      flex: 1;
      overflow:hidden;
    }
  }
}
.anchorBL{
  display:none;
}
.nav-enter{
  transform:translateY(100%);
}
.nav-enter-active{
  transition: all 0.4s ease;
}
.nav-enter-to{
  transform:translateY(0%);
}
.nav-leave-active{
  transition: all 0.2s ease;
}
.nav-leave{
  transform: translateY(0%);
}
.nav-leave-to{
  transform: translateY(-100%);
}


</style>
