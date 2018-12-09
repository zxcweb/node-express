<template>
  <div
    class="mapView"
    ref="mapView"
  >
    <div id="map"></div>
    <ul id="mapNav">
      <li>
        <el-tooltip
        class="item"
        effect="dark"
        content="路线查询"
        placement="bottom"
        :open-delay="800"
      >
        <div><span class="iconfont icon-luxian"></span><span>路线</span><b></b></div>
        </el-tooltip>
        </li>
      <li>
        <el-tooltip
        class="item"
        effect="dark"
        content="经纬度定点"
        placement="bottom"
        :open-delay="800"
      >
        <div><span class="iconfont icon-jingweidu"></span><span>经纬</span><b></b></div>
        </el-tooltip>
        </li>
      <li>
        <el-tooltip
        class="item"
        effect="dark"
        content="两点测距"
        placement="bottom"
        :open-delay="800"
      >
        <div><span class="iconfont icon-juliceliang"></span><span>测距</span><b></b></div>
        </el-tooltip>
        </li>
      <li>
        <el-tooltip
        class="item"
        effect="dark"
        content="切换底图"
        placement="bottom"
        :open-delay="800"
        
      >
        <div><span class="iconfont icon-qiehuan"></span><span>切换</span></div>
        </el-tooltip>
        </li>
    </ul>
    <div
      id="screenUp"
      @click="screenUpFun"
      v-show="!isScreen"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="地图全屏"
        placement="left"
        :open-delay="800"
      >
        <span class="iconfont icon-quanping"></span>
      </el-tooltip>
    </div>
    <div
      id="screenUp"
      @click="screenUpFun"
      v-show="isScreen"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="退出全屏"
        placement="left"
        :open-delay="800"
      >
        <span class="iconfont icon-tuichuquanping-copy"></span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { MP } from "./map.js";
import $ from 'jquery';
export default {
  name: "mapView",
  data() {
    return {
      ak: "hRDWYNkYj5tT34f8MgTDbU2kNbNOcNHG", //密钥
      map: null,
      isScreen: false
    };
  },
  mounted() {
    //所有dom加载完成
    this.$nextTick(function() {
      MP(this.ak).then(BMap => {
        this.initMap(BMap);
      });
    });
  },
  methods: {
    // 地图基础配置
    initMap(BMap) {
      // 初始化地图实例
      this.map = new BMap.Map("map");
      //坐标点转换
      let point = new BMap.Point(116.404, 39.915);
      // 设置初始中心点和层级
      this.map.centerAndZoom(point, 15);
      // 允许鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true);
      // 添加缩放控件
      var opts = {
        type: BMAP_NAVIGATION_CONTROL_ZOOM,
        anchor: BMAP_ANCHOR_TOP_RIGHT
      };
      this.map.addControl(new BMap.NavigationControl(opts));
    },
    screenUpFun() {
      if (!this.isScreen) {
        this.$refs.mapView.style.position = "inherit";
        $("#aside-menu").css({zIndex:0})
      } else {
        this.$refs.mapView.style.position = "relative";
        $("#aside-menu").css({zIndex:2})
      }
      this.isScreen = !this.isScreen;
    }
  },

  components: {}
};
</script>
<style lang="less" scoped>
@import "~@/assets/theme/index.less";
.mapView {
  position: relative;
  width: 100%;
  height: 100%;
  #map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  #mapNav {
    position: absolute;
    top: 20px;
    left: 20px;
    height: 36px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      height:100%;
      div{
        width:100%;
        height:100%;
        padding: 0 8px;
        display:flex;
        align-items: center;
      }
      &:hover {
        color: @themeColor;
      }
      .active {
        color: @themeColor;
      }
      .iconfont {
        margin-right: 4px;
      }
      b {
        display: inline-block;
        width: 1px;
        height: 16px;
        background-color: #ddd;
        line-height: 30px;
        margin-left: 10px;
        box-shadow: 1px 0px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
  #screenUp {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 28px;
    height: 28px;
    border-radius: 3px;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: @themeColor;
    }
  }
}
</style>

