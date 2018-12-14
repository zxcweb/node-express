<template>
  <div class="weather">
    <div id="w_forecast">

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
          console.log(result);
        }
      })
      .catch(error => {
        console.log(error)
      });
  },
  components: {}
};
</script>
<style lang="less" scoped>
.weather {
  width: 100%;
  height: 100%;
  // background-color: blue;
}
</style>

