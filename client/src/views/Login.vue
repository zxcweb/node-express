<template>
    <div class="login-bg">

    </div>
</template>

<script>
    export default {
        name:'login',
    }
</script>

<style lang="less" scoped>
    .login-bg{
            width:100%;
            height:100%;
            background:url("../assets/images/login_bg.jpg") no-repeat center center;
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            opacity: .3;
        }
    @media screen and (min-height:667px){
        .login-bg{
            background-size:auto 100%;
        }
    }
    @media screen and (max-height:666px){
        .login-bg{
            background-size:100% 100%;
        }
    }
    
</style>