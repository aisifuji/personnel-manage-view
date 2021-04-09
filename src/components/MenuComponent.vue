<template>
 <div class="menupage">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      background-color="#1f3f67"
      :unique-opened="true"
      text-color="#ffffffcc"
      active-text-color="#fff">
      <el-submenu :index="item.id.toString()" v-for="(item) in menu" :key="item.id">
        <template slot="title">
          <i :class="item.iconCls"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(_item) in item.children"  :key="_item.id" :index="_item.url"  :class="$route.path == _item.url && 'open-active'">{{_item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import TYPE from "../store/storeType";
export default {
  props: {
    menu: {
      default: []
    }
  },
  name: "menu-component",
  data() {
    return {
      // editableTabs:[]
    }
    },
  created() {},
  methods: {
    getBtn(val) {
      // this.$axios.get("permission/findButtonByParent/" + val.id).then(res => {
      //   if (res.data.code == 200) {
      //     this.$store.commit(TYPE.ButtonByParent, res.data.result);
      //     this.$router.push({ path: val.url });
      //   }
      // });
      // let newTabName = ++this.tabIndex + '';
      this.$store.commit(TYPE.editableTabsValue,val.url);
      this.$axios.post('sysResources/getButton',{
        id:val.id
      }).then(res=>{
        if (res.data.code == 200) {
          this.$store.commit(TYPE.ButtonByParent, res.data.data);
          this.$router.push({ path: val.url });
        }
      })
      for (let i = 0; i < this.editableTab.length; i++) {
        if (this.editableTab[i].name == val.url) {
        return
        }
      }
      this.editableTab.push({
        title: val.name,
        name: val.url,
      });
      // this.editableTab.forEach((tab, index) => {
      //   if (tab.name == val.name) {
      //
      //     this.editableTab.push({
      //       title: val.name,
      //       name: val.url,
      //
      //     });
      //   }
      // });

      this.$store.commit(TYPE.editableTabs,this.editableTab);
      // this.$store.commit(TYPE.editableTabsValue,this.editableTabsValue);
      // this.editableTabsValue = newTabName;

    }
  },
  watch: {
    listenDataPkid: function() {}
  },
  computed: {
    listenDataPkid() {
      return this.$route.path;
    },
    editableTab() {
      return this.$store.state.editableTabs
    }
  },
  mounted() {
    if (this.$route.path) {
      console.log(this.menu)
      this.menu.forEach(val => {
        if(val.children){
          val.children.forEach(item => {
            if (item.url == this.$route.path) {
              this.editableTab.push({
                title: item.name,
                name: item.url,
                iconCls: item.iconCls
              });
              this.$store.commit(TYPE.editableTabs,this.editableTab);
              this.$store.commit(TYPE.editableTabsValue,item.url);
            }
          });
        }

      });
      // this.getBtn()
    }
  }
};
</script>

<style lang="less" scoped>
.menupage::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.menupage {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.menupage /deep/ .el-menu {
  border: none;
}
.menupage /deep/ .el-menu-item-group__title{
  padding: 0;
}
.menupage /deep/ .el-menu-item{
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  background-color: #00060C !important;
}
.menupage /deep/ .el-menu-item:hover{
  background-color: #2b85df !important;
}
.menupage /deep/ .el-submenu__title{
  height: 48px;
  line-height: 48px;
  background-color: #001931 !important;
}
.menupage /deep/ .el-submenu__title:hover{
  background-color: #001931 !important;
}
.open-active{
  background-color: #2b85df !important;
}
</style>
