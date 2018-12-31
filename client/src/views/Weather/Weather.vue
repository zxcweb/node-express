<template>
  <div class="weather">
    <div
      id="w_forecast"
      v-if="datas"
    >
      <!-- <div class="w_"></div> -->

      <ul class="w_box">
        <li class="w_today">
          <div class="w_t_week">{{convertWeek(datas[0].date)}}</div>
          <div class="w_t_date">
            {{datas[0].date}}
          </div>
          <div class="w_t_img">
            <img
              :src="getImgUrl(datas[0].cond_code_d)"
              alt="天气"
              class="w_img_big"
            >
          </div>
          <div class="w_t_temp">
            <span>{{datas[0].tmp_min}}℃ ～ {{datas[0].tmp_max}}℃</span>
            &nbsp;&nbsp;
            <span class="w_status">{{datas[0].cond_txt_d}}</span>
            &nbsp;&nbsp;
            <span
              class="iconfont icon-tianqi-fengxiang w_rotate"
              :style="{transform:'rotate('+datas[0].wind_deg+'deg)'}"
            ></span>
          </div>
          <div class="w_t_table">
            <table>
              <tbody>
                <tr>
                  <td>风力:</td>
                  <td>{{datas[0].wind_sc}}级</td>
                  <td>风向:</td>
                  <td>{{datas[0].wind_dir}}</td>
                </tr>
                <tr>
                  <td>相对湿度:</td>
                  <td>{{datas[0].hum}}</td>
                  <td>降水量:</td>
                  <td>{{datas[0].pcpn}}</td>
                </tr>
                <tr>
                  <td>紫外线强度:</td>
                  <td>{{datas[0].uv_index}}</td>
                  <td>大气压强:</td>
                  <td>{{datas[0].pres}}</td>
                </tr>
              </tbody>

            </table>
          </div>

        </li>
        
        <li
          v-for="(item,index) in datas"
          class="w_forecast_item"
          :key="index"
        >
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
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import server from "@/server";
import options from "./options"
export default {
  name: "weather",
  data() {
    return {
      activeName:'first',
      datas: null,
      rotateDeg: 100,
      imgUrl: require("../../assets/images/default_Icon.png"),
      firstChart:null
    };
  },
  mounted() {
    server
      .weather({
        location: "北京"
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
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.firstChart = this.$echarts.init(document.getElementById("firstChart"));
    //loading取消
    this.$store.commit("loading", { flag: false });
  },
  methods: {
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
    getImgUrl(name) {
      return require("../../assets/images/weather/" + name + ".png");
    },
    handleClick(e){
      if(e.name == "first"){
        this.firstChart.setOption(options.firstChart())
      }else if(e.name == "second"){

      }else if(e.name == "third"){

      }else if(e.name == "fourth"){

      }
    }
  },
  components: {}
};
</script>
<style lang="less">
@import "~@/assets/theme/index.less";
.weather {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #1a70c0, #6faade);
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
            height: 100%;
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
      border-radius:3px;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.3);
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
</style>

