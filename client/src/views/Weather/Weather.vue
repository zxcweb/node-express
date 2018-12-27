<template>
  <div class="weather">
    <div id="w_forecast">
      <!-- <div class="w_"></div> -->

      <ul class="w_box">
        <li class="w_today">
          <div class="w_t_week">周一</div>
          <div class="w_t_date">
            12月29日
          </div>
          <div class="w_t_img">
            <img
              :src="imgUrl"
              alt="天气"
              class="w_img_big"
            >
          </div>
        </li>
        <li class="w_forecast_item"></li>
        <li class="w_forecast_item"></li>
        <li class="w_forecast_item"></li>
        <li class="w_forecast_item"></li>
        <li class="w_forecast_item"></li>
        <li class="w_forecast_item"></li>
      </ul>

    </div>
    <div id="w_charts">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import server from "@/server";
export default {
  name: "weather",
  data() {
    return {
      datas:null,
      imgUrl: require("../../assets/images/default_Icon.png")
    };
  },
  mounted() {
    server
      .weather({
        location: "哈尔滨"
      })
      .then(data => {
        if (
          data.HeWeather6 &&
          data.HeWeather6[0] &&
          data.HeWeather6[0].status === "ok"
        ) {
          let result = data.HeWeather6[0];
          console.log(result);
          this.imgUrl = require("../../assets/images/weather/" +
            result.daily_forecast[0].cond_code_d +
            ".png");
        }
      })
      .catch(error => {
        console.log(error);
      });
    //loading取消
    this.$store.commit("loading", { flag: false });
  },
  methods:{
    convertWeek(date){
      return new Date(date).getDay
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.weather {
  width: 100%;
  height: 100%;
  // background-color: blue;
  display: flex;
  flex-direction: column;
  #w_forecast {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    .w_box {
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      background:rgb(50, 128, 247);
      li {
        width: 12%;
        height: 100%;
      }
      li.w_today {
        width: 28%;
        display:flex;
        flex-direction: column;
        align-items: center;
        .w_t_img{
          width:100px;
          height:100px;
          display:flex;
          align-items: center;
          justify-content: center;
          img.w_img_big {
            height: 100%;
          }
        }
        
      }
    }
  }
  #w_charts {
    flex: 1;
  }
}
</style>

