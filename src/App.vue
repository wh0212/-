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
body{
  background: rgb(243, 243, 243);
  margin:0px;
  padding: 0px;
}
</style>
