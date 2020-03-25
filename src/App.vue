<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.style.background = "#f2f3f5";
  },

  data() {
    return {};
  }
};
</script>


<style scoped>
@import "./styles/iconfont.wxss";
body {
  background: #f2f3f5;
  margin: 0px;
  padding: 0px;
}
</style>
