<template>
    <div>
        <div style="display: flex">
            <div v-for="(item,index) in arr" :key="index"  >
                <div class="flow-Chart" :class="item.status==1?'adopt':''" :style="index+1==arr.length?'overflow: hidden':''">
                    <div class="text">{{item.operatorsRole}}({{item.action}})</div>
                    <div class="text">{{item.operators}}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        arr:{  // 流程图格式 [{text:(显示内容),type:(进度)}]
            type:Array,
            default:[]
        },
    },
    data() {
      return {
        active:0
      }
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
.flow-Chart{
       margin-right: 20px;
       border-radius: 24%;
       width: 130px;
       height: 90px;
       line-height: 90px;
       background-color: rgb(22, 152, 209);
       text-align: center;
       position: relative;
       display: inline-block;
       margin-top: 15px;
    }
    .text{
        width: 130px;
        height: 30px;
        line-height: 60px;
        color: #fff;
    }
    .adopt{
        background-color: rgb(0, 204, 102);
    }
    .flow-Chart::after{
           font-size: 30px;
           content:"\e6e9";
           font-family:element-icons!important;
           position: absolute;
           left: 125px;
           top: 0;
    }

</style>
