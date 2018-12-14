<template>
  <div
    class="mapView"
    ref="mapView"
  >
    <div id="map"></div>
    <ul id="mapNav" @click="handleTool">
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
      <li @click="lngAndLatfun">
        <el-tooltip
          class="item"
          effect="dark"
          content="经纬度定点"
          placement="bottom"
          :open-delay="800"
        >
          <div :class="{active:clickMap}"><span class="iconfont icon-jingweidu"></span><span>经纬</span><b></b></div>
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
      <li @click="tipOpen">
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
import $ from "jquery";
export default {
  name: "mapView",
  data() {
    return {
      ak: "hRDWYNkYj5tT34f8MgTDbU2kNbNOcNHG", //密钥
      map: null,
      isScreen: false,
      layers: 0,
      clickMap:false,
      layerName: [
        {
          name: "base",
          cnName: "基础地图"
        },
        {
          name: "Panorama",
          cnName: "全景地图"
        },
        {
          name: "night",
          cnName: "夜晚模式"
        },
        {
          name: "mapType",
          cnName: "底图类型"
        }
      ],
      layersObj: {
        stCtrl: null,
        ctrl: null,
        mapType: null
      }
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
    initMap(BMap, BMapLib) {
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
        $("#aside-menu").css({ zIndex: 0 });
      } else {
        this.$refs.mapView.style.position = "relative";
        $("#aside-menu").css({ zIndex: 2 });
      }
      this.isScreen = !this.isScreen;
    },
    //经纬度问题
    lngAndLatfun(){
      //地图添加点击事件
      if(!this.clickMap){
        this.map.addEventListener("click", this.showInfo);
        this.map.setDefaultCursor("crosshair");
      }else{
        this.map.removeEventListener("click", this.showInfo);
        this.map.setDefaultCursor("pointer");
      }
      this.clickMap = !this.clickMap;
      
    },
    tipOpen() {
      let index = this.indexFun();
      this.layerConvert(index);
      this.$message("底图已经切换为：" + this.layerName[index].cnName);
    },
    indexFun() {
      let len = this.layerName.length;
      this.layers += 1;
      this.layers = this.layers == len ? 0 : this.layers;
      return this.layers;
    },
    layerConvert(index) {
      let name = this.layerName[index].name;
      //隐藏所有底图，排除base
      this.removeLayers();
      if (name === "base") {
      } else if (name === "Panorama") {
        this.layersObj.stCtrl = new BMap.PanoramaControl({
          offset: new BMap.Size(40, 10),
          type: BMAP_ANCHOR_TOP_RIGHT
        }); //构造全景控件
        this.map.addControl(this.layersObj.stCtrl); //添加全景控件
      } else if (name === "night") {
        this.layersObj.ctrl = this.map.setMapStyle({ style: "midnight" });
      } else if (name === "mapType") {
        this.layersObj.mapType = new BMap.MapTypeControl({
          offset: new BMap.Size(40, 10),
          type: BMAP_ANCHOR_TOP_RIGHT
        });
        this.map.addControl(this.layersObj.mapType);
      }
    },
    removeLayers() {
      for (let key in this.layersObj) {
        if (this.layersObj[key]) {
          this.map.removeControl(this.layersObj[key]);
        }
        this.layersObj[key] = null;
      }
      this.map.setMapStyle({ style: "" });
    },
    showInfo(e) {
      var opts = {
        width: 120, // 信息窗口宽度
        height: 60, // 信息窗口高度
        title: "地图经纬度" // 信息窗口标题
      };
      var infoWindow = new BMap.InfoWindow(
        "经度："+e.point.lng+"<br/>"+"纬度："+e.point.lat,
        opts
      ); // 创建信息窗口对象
      var point = new BMap.Point(e.point.lng,e.point.lat);
      this.map.openInfoWindow(infoWindow,point); //开启信息窗口
      console.log(e)
    },
    handleTool(e){
      $(e.currentTarget).find(".active").removeClass("active")
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
      height: 100%;
      div {
        width: 100%;
        height: 100%;
        padding: 0 8px;
        display: flex;
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

