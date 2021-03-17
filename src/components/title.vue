<template>
    <div class="box" :style="{borderRadius:radius+'px',backgroundColor:backgroundColor,paddingLeft: '0px', paddingRight:'15px', paddingTop:'25px', paddingBottom:'40px'}" :class="title=='报修信息'?'border':'notTop'">
        <div class="tips">
                <div class="box-title" v-if="title">{{title}}</div>
                <div class="title-news" v-if="news">
                    <slot name="news"></slot>
                </div>
        </div>


        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        padding:{
            type:[String,Number],
            default:25
        },
        radius:{
            type:[String,Number],
            default:0
        },
        height:{
            type:[String,Number],
            default:200
        },
        title:{
            type:[String,Number]
        },
        news:{
            type:Boolean
        },
        backgroundColor:{
            type:String,
            default:'#fff'
        },


        list:{
            type:Array,
            default() {
              return []
            }
        }
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
.border{
    border-top: 1px solid #ffffff !important
}
.notTop{
    
}
.box {
    padding-top: 25px;
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 40px;
    &-leable{
        border-bottom: 1px solid #E4E7ED;
        margin-bottom: 15px;
    }
    box-sizing: border-box;
    &-title{
        margin-bottom: 20px;
        padding-bottom: 4px;
        color: #666666;
        font-size: 15px;
        font-weight: 700;
        &__more{
            position: absolute;
            top: 25px;
            right: 25px;
            color: #2E98FB;
            cursor: pointer;
        }
    }
    &-title::before{
        content: '';
        display: inline-block;
        width: 4px;
        height: 13px;
        background:#2E98FB;
        border-radius: 3px;
        margin-right: 10px;
    }
    
}

.tab-active{
  color:#0a0
}
  .title-news{
    position: absolute;
    margin-top: -33px;
    right: 30px;
  }
</style>
