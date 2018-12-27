<template>
  <div class="weather">
    <div id="w_forecast">
      <img :src="imgUrl" alt="tianqi">
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
  data(){
    return {
      imgUrl:''
    }
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
          console.log(result)
          this.imgUrl = require('../../assets/images/weather/'+result.daily_forecast[0].cond_code_d+".png");
        }
      })
      .catch(error => {
        console.log(error)
      });
      //loading取消
      this.$store.commit("loading",{flag:false});
  },
  components: {}
};
</script>
<style lang="less" scoped>
.weather {
  width: 100%;
  height: 100%;
  // background-color: blue;
  background-color: blue;
}
</style>

