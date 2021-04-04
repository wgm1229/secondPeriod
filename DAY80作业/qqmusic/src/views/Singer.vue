<template>
    <div>
        我是歌手页面
        <div class="top-singer">
            <div class="item" v-for="(item,index) in singerList" :key="index">
                <img :src="item.singer_pic" alt="">
                <p>{{item.singer_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../utils/request'
    export default {
        data() {
            return {
                singerList: []
            }
        },
        created () {
            request.get('hehe/singer/list')
            .then(res=>{
                this.singerList = res.data.data.list
                console.log(this.singerList)
            });
        },
    }
</script>

<style lang="less" scoped>
@import '../style/index.less';
*{margin: 0;padding: 0;}
    .top-singer{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 150/@remSize;
            height: 220/@remSize;
            // background-color: orange;
            margin-left: 25/@remSize;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 6px;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
            img{
                width: 90/@remSize;
                height: 90/@remSize;
                display: inline-block;
                border-radius: 50%;
                margin-top: 20/@remSize;
                margin-bottom: 10/@remSize;
            }
            p{
                font-size: 18/@remSize;
            }
        }
    }
</style>