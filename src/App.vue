<template>
  <div id="app">
    <router-view />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
export default {
  components: {
    Tabbar
  },
  data() {
    return {};
  }
};
</script>


<style>
@import "./styles/iconfont.wxss";
</style>
