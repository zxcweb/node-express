<template>
    <div id="aside-menu">
        <ul>
            <router-link to="/" tag="li">首页</router-link>
            <router-link to="/about" tag="li">关于</router-link>
        </ul>

    </div>
</template>

<script>
export default {
    name: "asideNav"
};
</script>

<style scoped lang="less">
#aside-menu {
    width: 180px;
    height: 100%;
    background-color: #293c55;
    ul{
        width:100%;
        li{
            color:#fff;
            font-size:14px;
            width:100%;
            height:54px;
            text-align:center;
            line-height:54px;
            cursor: pointer;
        }
    }
}
</style>