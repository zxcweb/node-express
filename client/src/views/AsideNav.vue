<template>
    <div id="aside-menu">
        <ul  @click="switchNav">
            <router-link to="/" tag="li" :class="{active:active==1,home:true}"><span class="iconfont icon-icon_faxian-mian"></span>首页</router-link>
            <router-link to="/about" tag="li" :class="{active:active==2,manage:true}"  @click="switchNav"><span class="iconfont icon-icon_manger"></span>管理</router-link>
            <router-link to="/about" tag="li" :class="{active:active==3,map:true}"  @click="switchNav"><span class="iconfont icon-icon_dingwei-mian"></span>地图</router-link>
            <router-link to="/about" tag="li" :class="{active:active==4,collect:true}"  @click="switchNav"><span class="iconfont icon-icon_shoucang-mian"></span>收藏</router-link>
        </ul>

    </div>
</template>

<script>
export default {
    name: "asideNav",
    data(){
        return {
            active:1
        }
    },
    methods:{
        switchNav(e){
            let cur = e.target;
            console.log(cur)
        }
    }
};
</script>

<style scoped lang="less">
@import '../assets/theme/index.less';
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
            display:flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .iconfont{
                color:#fff;
                margin-right:6px;
                font-size:16px;
            }
        }
        li:hover{
            background-color: @themeColor;
            font-size:17px;
        }
        li.active{
            background-color: @themeColor;
            font-size:17px;
        }
    }
}
</style>