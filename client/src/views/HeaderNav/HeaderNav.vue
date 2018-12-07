<template>
    <div id="nav">
      <div class="logo" title="学习吧管理系统">
        <img src="../../assets/images/logo.png" alt="logo">
        <span>web前端超市</span>
      </div>
      <div class="user">
        <img class="avator-icon" src="../../assets/images/avator.png"/>
        <span>超厉害</span>
      </div>
    </div>
</template>

<script>
    export default {
        name:'headerNav',
        data(){
          return {
            value:'11'
          }
        },

        props:["datac"],
        methods:{
        }
    }
</script>

<style scoped lang="less">
@import '~@/assets/theme/index.less';
#nav {
    height:50px;
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items: center;
    background-color: @base;
    .logo{
      display:flex;
      align-items:center;
      margin-left:50px;
      font-size:18px;
      color:#fff;
      img{
        height:40px;
        margin-right:10px;
      }
    }
    .user{
      display:flex;
      align-items:center;
      margin-right:50px;
      font-size:14px;
      color:#fff;
      .avator-icon{
        height:24px;
        margin-right:5px;
      }
    }

}
</style>