<template>
  <div class="weather_box">

    <div id="w_forecast">
      <!-- <div class="w_"></div> -->

      <ul class="w_box">
        <!-- <li
          class="w_today"
          v-for="(item,index) in data0"
          :key="index"
        >
          

        </li> -->
        <li
          v-for="(item,index) in datas"
          :class="{w_forecast_item:index!==0,w_today:index===0}"
          :key="index"
        >
          <template v-if="index===0">
            <div class="w_t_week">{{convertWeek(item.date)}}</div>
            <div class="w_t_date">
              {{item.date}}
            </div>
            <div class="w_t_img">
              <img
                :src="getImgUrl(item.cond_code_d)"
                alt="天气"
                class="w_img_big"
              >
            </div>
            <div class="w_t_temp">
              <span>{{item.tmp_min}}℃ ～ {{item.tmp_max}}℃</span>
              &nbsp;&nbsp;
              <span class="w_status">{{item.cond_txt_d}}</span>
              &nbsp;&nbsp;
              <span
                class="iconfont icon-tianqi-fengxiang w_rotate"
                :style="{transform:'rotate('+item.wind_deg+'deg)'}"
              ></span>
            </div>
            <div class="w_t_table">
              <table>
                <tbody>
                  <tr>
                    <td>风力:</td>
                    <td>{{item.wind_sc}}级</td>
                    <td>风向:</td>
                    <td>{{item.wind_dir}}</td>
                  </tr>
                  <tr>
                    <td>相对湿度:</td>
                    <td>{{item.hum}}</td>
                    <td>降水量:</td>
                    <td>{{item.pcpn}}</td>
                  </tr>
                  <tr>
                    <td>紫外线强度:</td>
                    <td>{{item.uv_index}}</td>
                    <td>大气压强:</td>
                    <td>{{item.pres}}</td>
                  </tr>
                </tbody>

              </table>
            </div>
          </template>
          <template v-if="index!==0">
            <div class="w_week">{{convertWeek(datas[index].date)}}</div>
            <div class="w_date">
              {{datas[index].date}}
            </div>
            <div class="w_img">
              <img
                :src="getImgUrl(datas[index].cond_code_d)"
                alt="天气"
                class="w_img_big"
              >
            </div>
            <div>
              <span class="w_status">{{datas[index].cond_txt_d}}</span>
            </div>
            <div>
              <span
                class="iconfont icon-tianqi-fengxiang w_rotate"
                :style="{transform:'rotate('+datas[index].wind_deg+'deg)'}"
              ></span>
            </div>
            <div class="w_t_temp">
              <span>{{datas[index].tmp_min}}℃ ～ {{datas[index].tmp_max}}℃</span>
            </div>
          </template>

        </li>
      </ul>

    </div>
    <div id="w_charts">
      <div class="w_c_box">
        <div class="w_c_nav">
          <div
            :class="{w_c_first:true, active:active===0}"
            @click="handleTags"
          >气温</div>
          <div
            :class="{w_c_second:true,active:active===1}"
            @click="handleTags"
          >湿度</div>
          <div
            :class="{w_c_thrid:true,active:active===2}"
            @click="handleTags"
          >降水量</div>
        </div>
        <div class="w_c_container">
          <div
            id="w_c_first"
            :class="{active:active===0}"
          >

          </div>
          <div
            id="w_c_second"
            :class="{active:active===1}"
          >

          </div>
          <div
            id="w_c_third"
            :class="{active:active===2}"
          >

          </div>
        </div>
      </div>
    </div>
    <Eye/>
  </div>

</template>

<script>
// @ is an alias to /src
import server from "@/server";
import options from "./options.js";
import Eye from '@/components/Eye';
import {mapState} from 'vuex'
import $ from "jquery";

//引入echarts
import echarts from "echarts";
export default {
  name: "weather",
  data() {
    return {
      datas: null,
      active: 0,
      rotateDeg: 100,
      imgUrl: require("../../assets/images/default_Icon.png"),
      firstChart: null,
      secondChart: null,
      thirdChart: null
    };
  },
  computed: {
    ...mapState(['resultArea'])
  },
  mounted() {
    this.$nextTick(() => {
      //初始化echarts
      this.initEcharts();
      //请求数据并加载第一个图表
      this.getData();
      //loading取消
      this.$store.commit("loading", { flag: false });
    });
  },
  methods: {
    //请求数据
    getData(){
      server
        .weather({
          location: this.resultArea
        })
        .then(data => {
          if (
            data.HeWeather6 &&
            data.HeWeather6[0] &&
            data.HeWeather6[0].status === "ok"
          ) {
            let result = data.HeWeather6[0];
            this.datas = result.daily_forecast;
            console.log(this.datas);
            this.imgUrl = require("../../assets/images/weather/" +
              result.daily_forecast[0].cond_code_d +
              ".png");
            this.firstChartFun();
          }
        });
    },
    //日期转换周
    convertWeek(date) {
      let d = new Date(date).getDay();
      switch (d) {
        case 0:
          return "周日";
        case 1:
          return "周一";
        case 2:
          return "周二";
        case 3:
          return "周三";
        case 4:
          return "周四";
        case 5:
          return "周五";
        case 6:
          return "周六";
      }
    },
    //获取本地图片
    getImgUrl(name) {
      return require("../../assets/images/weather/" + name + ".png");
    },
    //点击图表tab
    handleTags(e) {
      this.active = $(".w_c_nav>div").index($(e.currentTarget));
      if (this.active === 0) {
        this.firstChartFun();
        setTimeout(()=>{
          this.firstChart.resize();
        })
      } else if (this.active === 1) {
        this.secondChartFun()
        setTimeout(()=>{
          this.secondChart.resize();
        })
        
      } else if (this.active === 2) {
        this.thirdChartFun();
        setTimeout(()=>{
          this.thirdChart.resize();
        })
      }
    },
    //初始化echarts
    initEcharts() {
      this.firstChart = echarts.init(document.getElementById("w_c_first"));
      this.secondChart = echarts.init(document.getElementById("w_c_second"));
      this.thirdChart = echarts.init(document.getElementById("w_c_third"));
    },
    //气温图表
    firstChartFun() {
      let data = this.datas;
      let data1 = [];
      let data2 = [];
      let date = [];

      data.map(item => {
        data1.push(item.tmp_max);
        data2.push(item.tmp_min);
        let w = item.date + "(" + this.convertWeek(item.date) + ")";
        date.push(w);
      });
      this.firstChart.setOption(options.firstOption(data1, data2, date));
    },
    //相对湿度
    secondChartFun(){
      let data = this.datas;
      let data0 = [];
      let date = [];

      data.map(item => {
        data0.push(item.hum);
        let w = item.date + "(" + this.convertWeek(item.date) + ")";
        date.push(w);
      });
      console.log(data0, date);
      this.secondChart.setOption(options.secondOption(data0, date));
    },
    //降水量
    thirdChartFun(){
      let data = this.datas;
      let data0 = [];
      let date = [];

      data.map(item => {
        data0.push(item.pcpn);
        let w = item.date + "(" + this.convertWeek(item.date) + ")";
        date.push(w);
      });
      this.thirdChart.setOption(options.thirdOption(data0, date));
    }
  },
  watch:{
    resultArea(e){
      this.getData()
    }
  },
  components: {
    Eye
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/theme/index.less";
.weather_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #1a70c0, #6faade);
  position:relative;
  #w_forecast {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-shadow: @textShadow;
    line-height: 20px;
    .w_box {
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      li {
        width: 12%;
        height: 100%;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        cursor: pointer;
      }
      li:last-child {
        width: 12%;
        height: 100%;
        border-right: 1px solid rgba(255, 255, 255, 0);
      }
      li.w_today {
        width: 28%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-right: 20px;
        .w_t_week {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .w_t_date {
          font-size: 14px;
        }
        .w_t_temp {
          font-size: 18px;
        }
        .w_t_table {
          width: 100%;
          font-size: 14px;
          margin-top: 10px;
          table {
            width: 100%;
            tr {
              td {
                padding: 0 3px;
                border: 1px solid rgba(255, 255, 255, 0.3);
              }
              td:nth-child(2n-1) {
                text-align: center;
              }
            }
          }
        }
        .w_t_img {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          img.w_img_big {
            // height: 100%;
          }
        }
      }
      .w_forecast_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          margin-bottom: 16px;
        }
        .w_img {
          width: 50px;
          height: 50px;
          display: flex;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .w_week {
          font-size: 16px;
        }
        .w_date {
          font-size: 14px;
        }
        .w_temp {
          font-size: 18px;
        }
      }
    }
  }
  #w_charts {
    flex: 1;
    padding: 0 20px 20px 20px;
    .w_c_box {
      width: 100%;
      height: 100%;
      border-radius: 3px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.3);
      .w_c_nav {
        height: 36px;
        line-height: 36px;
        display: flex;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        text-shadow: @textShadow;
        div {
          padding: 0 15px;
          position: relative;
          cursor: pointer;
        }
        div.active {
          background: rgba(255, 255, 255, 0.3);
          color: @themeColor;
          text-shadow: none;
        }
      }
      .w_c_container {
        flex: 1;
        div {
          width: 100%;
          height: 100%;
          display: none;
        }
        div.active {
          display: inline-block;
        }
      }
    }
  }
}
.w_status {
  display: inline-block;
  height: 24px;
  padding: 0 5px;
  background: rgb(130, 201, 30);
  border-radius: 3px;
  line-height: 24px;
  font-size: 16px;
  text-align: center;
}
.w_rotate {
  display: inline-block;
}
#eye{
  width:30px;
  height:30px;
}
</style>

