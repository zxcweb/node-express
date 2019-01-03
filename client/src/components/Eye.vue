<template>
    <div id="eye" :title="currentCity">
        <span class="iconfont icon-icon_dingwei-xian"></span>
        <transition name="slide-fade">
            <el-cascader
                expand-trigger="hover"
                change-on-select
                :options="options"
                @change="handleChange"
                size="mini"
                v-if="show"
                v-model="selectedOptions"
                @focus="handleFocus"
                @visible-change="vChange"
                style="width:220px;height:32px;position:absolute;left:100%;top:0;"
            >
            </el-cascader>
        </transition>
        
    </div>
</template>

<script>
import $ from 'jquery';
import city from '@/assets/city.js';
    export default {
        name:"eye",
        data(){
            return {
                options:city,
                currentCity:'北京',
                resultArea:'',
                selectedOptions:[],
                show:false
            }
        },
        methods:{
            mouseMove(){
                var timer = null;
                let bx = $("body").width();
                let by = $("body").height();
                document.body.onmousemove = (e) => {
                    let X=e.x/bx*100;
                    let Y=e.y/by*100;
                    $("#eye>.iconfont").css({
                        top: Y+'%',
                        left: X+'%'
                    })
                }
            },
            handleChange(e){
                this.currentCity = e.join('/');
                this.resultArea = e[e.length-1];
            },
            handleFocus(){
                console.log("focus")
            },
            vChange(e){
                if(!e){
                    this.show = false;
                }
            }
        },
        mounted(){
            this.mouseMove()
            $("#eye")[0].onmouseenter = ()=>{
                if(document.body.onmousemove){
                    document.body.onmousemove = null;
                    $("#eye>.iconfont").css({
                        top: '50%',
                        left: '50%'
                    })
                }
                this.show = true;
                this.selectedOptions = this.currentCity.split("/")
            }
            $("#eye")[0].onmouseleave = ()=>{
                if(!document.body.onmousemove){
                    this.mouseMove()
                }
                
            }
        },
        watch:{
            show(e){
                if(!e&&this.resultArea){
                    this.$store.commit("resultArea", { resultArea:this.resultArea });
                }
            }
        },
        destroyed(){
            document.body.onmousemove = null;
        }
    }
</script>

<style lang="less" scoped>
@import "~@/assets/theme/index.less";
#eye{
    position: absolute;
    top:20px;
    left:20px;
    z-index:100;
    width:30px;
    height:30px;
    border:1px solid @themeColor;
    border-radius: 4px;
    box-shadow: 0 0 1px rgba(0, 0, 0, .3);
    background: rgba(255,255,255,.5);
    cursor:pointer;
    .iconfont{
        display:inline-block;
        width:16px;
        height:16px;
        border-radius: 50%;
        top:50%;
        left:50%;
        position:absolute;
        transform: translate(-50%,-50%);
    }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>