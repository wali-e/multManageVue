<template>
    <div id="main">
        <div class="top">
            <img src="../assets/images/top.png" alt="">
            <div class="clock" v-show="statueShow">
                <span>{{clock.h}}</span>
                :
                <span>{{clock.i}}</span>
                :
                <span>{{clock.s}}</span>
            </div>
        </div>
        <img class="bottom" src="../assets/images/bottom.png" alt="">
        <button @click="goBuyLace"></button>
        <div id="notice">*「心之恋」仅在活动期间出售</div>
    </div>
</template>

<script>
    import vue from 'vue';
    import { Toast, Popup } from 'vant'
    vue.use(Toast).use(Popup);
    export default {
        name: "index",
        data(){
            return {
                clockId: null,
                auth: this.$route.query.auth,
                myId: this.$route.query.myId,
                clock: {
                    h: 0,
                    i: 0,
                    s: 0
                },
                statueShow: false,
                wallTime: null
            }
        },
        created() {
            this.getClock();
        },
        beforeRouteEnter(router,to,next){
            if(!router.query.auth || !router.query.myId){
                Toast('参数错误');
                return false
            }
            next();
        },
        methods: {
            goBuyLace(){
                location.href = this.axios.defaults.baseURL + '/Client/Zong_Mall/index?myId=' + this.myId + '&auth=' + this.auth;
            },
            getClock(){
                let that = this;
                let field = this.qs.stringify({
                    uid: that.myId,
                    auth: that.auth,
                }); //请求参数
                let act = '/Api/Zong_Twelve/clock';
                this.axios(
                    {
                        method: 'post',
                        url: that.axios.defaults.baseURL + act,
                        headers: {},
                        data: field
                    }
                ).then(resp => {
                    if('code' in resp.data && resp.data.code == 0 && 'data' in resp.data){
                        that.wallTime = resp.data.data;
                        clearTimeout(that.clockId);
                        that.statueShow = true;
                        that.timeDown(that.wallTime);
                    }else{
                        // 活动尚未开始
                    }
                }).catch(() => {
                    Toast('数据获取失败');
                });
            },
            /**
             *  倒计时
             * @param totalSeconds
             * @returns {boolean}
             */
            timeDown(totalSeconds) {
                let that = this;
                // //天数
                // let days = Math.floor(totalSeconds / (60 * 60 * 24));
                // if(days < 10) days = '0' + days;
                //
                // //取模（余数）
                // let modulo = totalSeconds % (60 * 60 * 24);

                //小时数
                let hours = Math.floor(totalSeconds / (60 * 60));
                if(hours < 10) hours = '0' + hours;
                this.clock.h = hours;
                let modulo = totalSeconds % (60 * 60);

                //分钟
                let minutes = Math.floor(modulo / 60);
                if(minutes < 10) minutes = '0' + minutes;
                this.clock.i = minutes;

                //秒
                let seconds = modulo % 60;
                if(seconds < 10) seconds = '0' + seconds;
                this.clock.s = seconds;

                if(totalSeconds <= 0) {
                    return false;
                }
                //延迟一秒执行自己
                that.clockId = setTimeout(function () {
                    that.timeDown(totalSeconds - 1);
                }, 1000)
            }
        }
    }
</script>

<style scoped lang="less">
    #main {
        width: 750px;
        min-height: 100vh;
        overflow: hidden;
        background-color: #170f4b;
        text-align: center;
        position: relative;
        .top {
            width: 750px;
            height: 1192px;
            img {
                width: 750px;
            }
            .clock{
                background: none;
                margin-top: -615px;
                font-size: 48px;
                font-weight: bold;
                color: #fffefe;
                span {
                    padding: 5px 8px;
                    font-size: 48px;
                    font-weight: bold;
                    color: #fffefe;
                    background-color: #5a0015;
                    border-radius: 8px;
                }
            }
        }
        img.bottom {
            width: 750px;
        }
        button {
            width: 561px;
            height: 112px;
            background-image: url("../assets/images/btn.png");
            background-repeat: no-repeat;
            background-size: 561px 112px;
            background-color: transparent;
            border: none;
        }
        #notice {
            font-size: 26px;
            color: #ff3333;
            margin: 30px auto 70px auto;
        }
    }
</style>