<template>
  <div id="aside-menu">
    <ul @click="switchNav">
      <router-link
        to="/"
        tag="li"
        :class="{active:active==1,home:true}"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="页面首页"
          placement="right"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_faxian-mian"></span>
            首页
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/manage"
        tag="li"
        :class="{active:active==2,manage:true}"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="个人管理"
          placement="right"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_manger"></span>
            管理
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/mapView"
        tag="li"
        :class="{active:active==3,map:true}"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="百度地图"
          placement="right"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_dingwei-mian"></span>
            地图
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/weather"
        tag="li"
        :class="{active:active==4,weather:true}"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="和风天气"
          placement="right"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-tianqi-duoyun"></span>
            天气
          </div>
        </el-tooltip>
      </router-link>
      <router-link
        to="/collect"
        tag="li"
        :class="{active:active==5,collect:true}"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="个人收藏"
          placement="right"
        >
          <div class="item_tooltip">
            <span class="iconfont icon-icon_shoucang-mian"></span>
            收藏
          </div>
        </el-tooltip>
      </router-link>
    </ul>

  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "asideNav",
  data() {
    return {
      active: 1
    };
  },
  methods: {
    switchNav(e) {
      let curAllLi = $(e.currentTarget).children();
      let thisLi = $(e.target);
      this.active = curAllLi.index(thisLi) + 1;
    },
    activeUpdate() {
      let name = this.$route.name;
      console.log(name);
      console.log(this);
      if (name == "manage") {
        this.active = 2;
      } else if (name == "mapView") {
        this.active = 3;
      } else if (name == "weather") {
        this.active = 4;
      } else if (name == "collect") {
        this.active = 5;
      } else {
        this.active = 1;
      }
    }
  },
  mounted() {
    this.activeUpdate();
  },

  watch: {
    $route(newValue, oldValue) {
      this.activeUpdate();
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/theme/index.less";
#aside-menu {
  width: 120px;
  height: 100%;
  background-color: #293c55;
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
    li.active {
      background-color: @themeColor;
      // font-size:17px;
      border-left: 2px solid #fff;
    }
  }
}
</style>