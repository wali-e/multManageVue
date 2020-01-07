<template>
    <div id="app">
        <div id="pageHead">
            <div class="left" @click="back()"><img src="./assets/images/iconLeft.png" alt=""></div>
            <div class="appTitle">{{$route.meta.title}}</div>
            <div class="cash" @click="$router.push({
            path: '/invite/cash',
            query: {
                auth: $route.query.auth,
                myId: $route.query.myId,
            }
        })">
            </div>
        </div>
        <div id="content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import vue from 'vue';
    import { Toast } from 'vant'
    vue.use(Toast);
    export default {
        name: 'app',
        beforeRouteEnter(router,to,next){
            if(!router.query.auth || !router.query.myId){
                Toast('参数错误');
                return false
            }
            next();
        },
        created() {
        },
        methods: {
            back(){
                if(this.$route.name === 'twelve'){
                    window.DriftBottleAppObject.appOnFinish();
                }else {
                    this.$router.back();
                }
            }
        },
    }
</script>

<style lang="less">
    body,div,p,span,ul,li,a,h1,h2,h3,h4,h5,h6,input,textarea {-webkit-appearance:none;margin:0;padding:0;font:24px"PingFang SC","Arial";}body{background:white;}a{text-decoration:none;}ol,ul,li{list-style:none;}input[type="button"],input[type="submit"],input[type="reset"]{-webkit-appearance:none;}
    /deep/.van-loading__text{font-size: 3.2vw;}
    #pageHead {
        padding: 0 22px 0 28px;
        /*position: fixed;*/
        /*z-index: 300;*/
        /*top: 0;*/
        width: 700px;
        height: 98px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left, .appTitle{
            font-size: 32px;
            font-weight: 400;
            color: rgba(50, 49, 50, 1);
        }
        .left{
            img {
                width: 22px;
                height: 34px;
            }
        }
    }
    #content {
        /*margin-top: 98px;*/
    }
</style>
