<template>
    <div>
        <div class="XcEmpty" :class="'XcEmpty-' + type  " :style="{marginTop:top+'px',height:height +'px'}"></div>
        <div class="XcEmpty-bg XcEmpty-msg" :style="{'color':textColor}">{{msg}}</div>
    </div>
</template>

<script>
export default {
    name:'XcEmpty',
    props:{
        type:{
            type:String,
            default:'default'
        },
        msg:{
            type:String,
            default:'暂无数据'
        },
        top:{
            type:Number,
            default:0
        },
        height:{
            type:Number,
            default:164
        },
        textColor:{
            type:String,
            default:'#0a5a68'
        }
    }
}
</script>

<style lang="less" scoped>
.XcEmpty-bg{
    background-size: contain;
    width: 100%;
}
.XcEmpty-default{
    background: url('./assets/default.png') 44% 50% no-repeat ;
}
.XcEmpty-information{
    background: url('./assets/information.png') 44% 50% no-repeat ;
}
.XcEmpty-msg{
    text-align: center;
    margin: 15px 0;
    letter-spacing: 2px;
}
</style>
