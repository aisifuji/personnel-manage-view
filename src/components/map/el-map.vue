<template>
  <div>
    <div class="map-mask">
      <div class="map-box">
        <div class="amap-page-container">
          <el-amap-search-box
            class="search-box"
            :search-option="searchOption"
            :on-search-result="onSearchResult"
          ></el-amap-search-box>
          <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
            <el-amap-marker
              v-for="(marker,index) in markers"
              :position="marker.position"
              :visible="marker.visible"
              class="label"
              :key="'lab'+index"
              clickable="true"
              :events="marker.events"
              :title="marker.title"
            ></el-amap-marker>
          </el-amap>
        </div>
        <div class="map-colse" @click="hideMap()">
          <i class="el-icon-circle-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
      location:{
        type:Array,
        default() {
          return [116.397128,39.916527]
        }
      },
      title:{
        type:String,
        default:''
      }
    },
  data() {
    return {
      markers: [
        {
          position: this.location,
          title:this.title,
          visible:true
          // events: {
          //   click: (e) => {
          //     let data = {
          //       place: e.target.Ce.title,
          //       position: [e.lnglat.lng, e.lnglat.lat]
          //     };
          //     this.$emit("getPlace", data);
          //   }
          // },
        }
      ],
      searchOption: {
        city: "全国",
        citylimit: true
      },
      mapCenter: this.location,
      mapShow: false,
    };
  },
  created(){
    console.log(this.location,this.title,navigator.gelocation,1111,this);
    this.markers[0].visible=this.location[0]==116.397128?false:true
    console.log(this.markers,7777);
  },
  methods: {
    //搜索的结果
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      var arr = [];
      var that = this;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          var obj = {
            position: [poi.lng, poi.lat],
            title: poi.name,
            events: {
              click: () => {
                let arr = [poi.lng, poi.lat];
                let geocoder = new AMap.Geocoder({
                  radius: 1000,
                  extensions: "all"
                });
                geocoder.getAddress(arr, function(status, result) {
                  var data = {
                    place: result.regeocode.formattedAddress,
                    position: [poi.lng, poi.lat]
                  };
                  that.$emit("getPlace", data);
                  // that.hideMap();
                });
              }
            }
          };
          arr.push(obj);
        });
        this.markers = arr;
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
    hideMap() {
      this.mapShow = false;
    },
    showMap() {
      this.mapShow = true;
    }
  }
};
</script>
<style scoped lang='less'>
.map-mask {
  /* position: fixed;
  left: 0;
  top: 0; */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.map-box {
  height: 450px;
  width: 100%;
  /*margin: 3% auto 0;*/
  position: relative;
}
.amap-page-container {
  position: relative;
  height: 100%;
  width: 100%;
  /deep/.el-vue-search-box-container{
    width: 300px;
    height: 30px;
  }
}
.amap-demo {
  height: 100%;
}
.map-colse {
  position: absolute;
  bottom: 100%;
  left: 100%;
  color: #fff;
  cursor: pointer;
}
.map-colse i {
  font-size: 80px;
}

.search-box {
  position: absolute;
  top: 9px;
  left: 20px;
}
</style>
