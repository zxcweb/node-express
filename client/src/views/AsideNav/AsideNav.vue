<template>
  <div id="aside-menu" ref="aside_menu" :class="[animateMenu]">
    <ul>
      <router-link
        to="/"
        tag="li"
        class="home"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="页面首页"
          placement="right"
          :open-delay="500"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_faxian-mian"></span>
            <span v-show="isOpen">首页</span>
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/manage"
        tag="li"
        class="manage"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="个人管理"
          placement="right"
          :open-delay="500"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_manger"></span>
            <span v-show="isOpen">管理</span>
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/mapView"
        tag="li"
        class="map"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="百度地图"
          placement="right"
          :open-delay="500"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_dingwei-mian"></span>
            <span v-show="isOpen">地图</span>
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/weather"
        tag="li"
        class="weather"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="和风天气"
          placement="right"
          :open-delay="500"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-tianqi-duoyun"></span>
            <span v-show="isOpen">天气</span>
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/collect"
        tag="li"
        class="collect"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="个人收藏"
          placement="right"
          :open-delay="500"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_shoucang-mian"></span>
            <span v-show="isOpen">收藏</span>
          </div>
        </el-tooltip>
      </router-link>
    </ul>
    <transition name="open_and_close">
      <div id="open-close-slide" v-show="isHover" @click="openAndCloseHandle">
        <span :class="'iconfont '+(isOpen?'icon-shouqi':'icon-xiangyoufanye')"></span>
      </div>
    </transition>  
  </div>

  
</template>

<script>
import $ from "jquery";
export default {
  name: "asideNav",
  data() {
    return {
      isOpen:false,
      isHover:false,
    };
  },
  computed:{
    animateMenu(){
      return this.isOpen?"animateMenuOpen":"animateMenuClose"
    }
  },
  methods: {
    openAndCloseHandle(){
      this.isOpen = !this.isOpen;
    }
  },
  mounted() {
    //列表hover
    $(this.$refs.aside_menu).hover(()=>{
      this.isHover = !this.isHover;
    },()=>{
      this.isHover = !this.isHover
    })
    //按钮hover
    $(this.$refs.aside_menu).hover(()=>{
      this.isHover = true;
    },()=>{
      this.isHover = false;
    })
    
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/theme/index.less";
#aside-menu {
  width: 45px;
  height: 100%;
  background-color: #293c55;
  position: relative;
  z-index:2;
  ul {
    width: 100%;
    li {
      color: #fff;
      font-size: 14px;
      width: 100%;
      height: 54px;
      text-align: center;
      line-height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .iconfont {
        color: #fff;
        margin-right: 6px;
        font-size: 16px;
      }
      .item_tooltip {
        width: 100%;
        height: 100%;
      }
    }
    li:hover {
      background-color: @themeColor;
      // font-size:17px;
    }
    li.router-link-exact-active {
      background-color: @themeColor;
      // font-size:17px;
      border-left: 2px solid #fff;
    }
  }
  #open-close-slide {
    width: 16px;
    height: 24px;
    font-size: 8px;
    color: #fff;
    border-radius: 0 2px 2px 0;
    line-height: 24px;
    position: absolute;
    top: 50%;
    right: -12px;
    transform: translate(0, -50%) scale(0.6, 1);
    cursor: pointer;
    background-color: @base;
  }
} 


/* 动画开始 */
.open_and_close-enter-active {
  animation: open_and_close-in .5s;
}
.open_and_close-leave-active {
  animation: open_and_close-in .3s reverse;
}
@keyframes open_and_close-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animateMenuOpen{
  animation: animateMeunOpen .5s forwards;
}
.animateMenuClose{
  animation: animateMeunClose .5s forwards;
}
@keyframes animateMeunOpen {
  from{
    width:45px;
  }
  to{
    width:120px;
  }

}
@keyframes animateMeunClose {
  from{
    width:120px;
  }
  to{
    width:45px;
  }

}
</style>