<template>
  <div class="map">
    <div id='container' ></div>
    <div class="search" v-show="search" >
      
      <el-button  type="primary" class="btn" @click="close">关闭</el-button>
    </div>
    <div class="tips" v-show="!search">
      
      <div class='info'>
        <div>操作说明：</div> 
        <div>1.矩形通过拖拽来绘制;标点,绘制区域取最后一次图形; </div>
        <div>2.绘制区域时鼠标左键点击点位(至少三点才能绘制图形),完成绘制时点击右键即可</div>
       
        </div>
      <div class="input-card" style='width: 24rem;' >
        <el-radio-group v-model="drawType"  class="center">
          <el-radio v-show="!editSpot"  label="marker">标点</el-radio>
          <el-radio v-show="!editSpot"  label="polygon">绘制区域</el-radio>
        </el-radio-group>
        <div class="input-item center">
            <el-button v-show="!editSpot" type="warning" class="btn" @click="clear"  >清除</el-button>
            <!-- <el-button v-show="!editSpot" type="danger" class="btn" @click="close"  >关闭绘图</el-button> -->
            <el-button v-show="editSpot" type="primary" class="btn" @click="edit"  >编辑</el-button>
            <el-button v-show="editSpot" type="info" class="btn" @click="off"  >关闭编辑</el-button>
            </div>
        </div>
        
    </div>
      
    
     
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props:{
    coordinate:{ // 多边形实例
      type:Array,
      default:[]
    },
    spot:{ // 点实例
      type:Array,
      default:[]
    }
  },
 
  watch:{
    coordinate(val){
      this.mCoordinate=val
    },
    spot(val){
      console.log(1111)

      this.mSpot=val
    },

  },
  data() {
    return {
       search:false,
       map:null,
       marker:null,    //点实例
       polygon:null,   // 多边形实例
       mousetool:null,
       drawType:null,
       overlays:[],
       mCoordinate:this.coordinate, //多边形
       mSpot:this.spot,       // 点坐标
       editSpot:true ,      // 点坐标是否可编辑
       center:[118.124268, 24.516877]
    };
  },
  mounted(){
    if(this.$route.query.data){
      console.log(this.$route.query.search)
      this.search=this.$route.query.search
      this.editSpot=true
      this.getDetail()
    }else{
      this.editSpot=false
      this.initMap()
    }
  },
  watch:{
    drawType(val){
      if(!val){
        return
      }
      this.draw(val)
    },

  },
  methods: {
    async getDetail(){
      let {data}= await this.$axios.post("sysArena/detail",{id:this.$route.query.data.id})
       if(data.code==200){
         let e =data.data
         let spotArr =[]
         spotArr.push(e.centerLongitude*1)
         spotArr.push(e.centerLatitude*1)
         let coordinateArr =[] 
         let arr = e.arenaLocation?JSON.parse(e.arenaLocation):[] 
            
         _.forEach(arr,(e)=>{
           coordinateArr.push(e)
         })  
        

          this.mCoordinate=coordinateArr

          this.mSpot=spotArr,
          this.center=spotArr
          this.initMap()
       }
       
    },
    initMap(){
        this.map = new AMap.Map("container", {
          center: this.center,
          zoom: 17
          });
          
          //  插件(鼠标绘制工具)
          this.map.plugin(["AMap.MouseTool"],()=>{ 
              this.mousetool = new AMap.MouseTool(this.map);
              // 绘制完成回调
              AMap.event.addListener( this.mousetool,'draw',(e)=>{
                // console.log('draw',e.obj) 
                 this.overlays.push(e.obj);
                  if(e.obj.w.path){
                      this.mCoordinate =_.map(e.obj.w.path,(e)=>{
                        return [
                          e.lng,
                          e.lat
                        ]
                      })
                      this.$emit('update:coordinate',this.mCoordinate)
                      return
                  }

                  if(e.obj.w.position){
                    console.log(e.obj.w.position)
                      this.mSpot = [
                          e.obj.w.position.lng,
                          e.obj.w.position.lat
                        ]
                      this.$emit('update:spot',this.mSpot)
                      return
                  }
                  

                  
              });
             
              
          });
        //  插件(地图层级)
        AMap.plugin('AMap.ToolBar',()=>{//异步加载插件
        
                var toolbar = new AMap.ToolBar();
                this.map.addControl(toolbar);
        });
        
        // 回显(点)
        
        // this.mSpot=this.spot
      
        // console.log('Marker',this.mSpot)
        if(this.mSpot.length!==0){
          this.marker = new AMap.Marker({
            position: this.mSpot,  
            zIndex: 50,
            draggable:this.editSpot,
        });
        ;
        this.map.add(this.marker);

        }
        
        // 回显(多边形)
        // this.mCoordinate=this.coordinate
        // console.log('Polygon',this.mCoordinate)
        // console.log('Polygon111112',this.coordinate)

        if(this.mCoordinate.length!==0){
          this.polygon = new AMap.Polygon({
            path: this.mCoordinate,  
            strokeColor: "#FF33FF", 
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
        });
        this.map.add(this.polygon);

        }
        
        
        // 编辑绘制物(多边形)
        this.map.plugin(["AMap.PolyEditor"],()=>{
            this.polyEditor = new AMap.PolyEditor(this.map,this.polygon); 
            // 编辑完成回调
            this.polyEditor.on('end', (e)=>{
              
                this.mCoordinate =_.map(e.target.w.path,(e)=>{
                    return [
                      e.lng,
                      e.lat
                    ]
                })
                // console.log(this.mCoordinate)
                this.$emit('update:coordinate',this.mCoordinate)
            })
        });     
        
    },
    draw(type){
        // console.log(this.mousetool)

      switch(type){
        case 'marker':{
            this.mousetool.marker({
              //同Marker的Option设置
            });
            break;
        }
        case 'polygon':{
            this.mousetool.polygon({
               fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
            }); 
            break;
        }
        
      }
    },  
    // 关闭绘图
    close(){
         this.$router.push({
              name:'placeManage'
            })
    },
    // 编辑
    edit(){
      this.polyEditor.open()
      this.marker.on('dragend', this.showInfoM)
    },
    // 清除点位
    clear(){
      let arr =[]
      this.$emit('update:spot',arr)
      this.$emit('update:coordinate',arr)
       this.map.remove(this.overlays)
       this.mousetool.close(true)
       this.drawType=null
    },
    // 关闭编辑
    off(){
      this.polyEditor.close()
      this.marker.off('dragend', this.showInfoM)

      console.log(this.mSpot)

      // this.initMap()
    },
    showInfoM(e){
      console.log(e)
        let arr =[]
        console.log(e.lnglat.getLng())
        console.log(e.lnglat.getLat())

        arr.push(e.lnglat.getLng())
        arr.push(e.lnglat.getLat())
        console.log(arr)
       this.mSpot=arr
        
       this.$emit('update:spot',this.mSpot) 
      
        
    }
  }
};
</script>
<style scoped lang='less'>
#container {
  width: 100%;
  height: 100%;
}
.map{
  position: relative;
  .tips{
    position: absolute;
    right: 50px;
    top: 40px;
    background-color: #fff;
    width:510px;
    padding: 10px;
  
   
  }
  .search{
    position: absolute;
    left: 100px;
    top: 50px;
  }  
  .info{
    display: inline-block;
  }
  .center{
    width:510px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
