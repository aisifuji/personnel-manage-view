<template>
  <div id="app" class="platform">
    <div>
      <router-view></router-view>
      <router-view name="login"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  #app {
    font-family: Microsoft YaHei,'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
