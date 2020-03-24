<template>
  <div id="app">
    <router-view />
    <van-button class="Customer" to="/custmoer" size="normal" round type="info">
      <i class="iconfont icon-xin"></i>
    </van-button>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
import { Button } from "vant";
export default {
  mounted() {
    document.body.style.background = "#f2f3f5";
  },
  components: {
    Tabbar,
    [Button.name]: Button
  },
  data() {
    return {};
  }
};
</script>


<style scoped>
@import "./styles/iconfont.wxss";
.iconfont {
  font-size: 0.7rem;
}
.Customer {
  position: fixed;
  bottom: 2rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
}
body {
  background: #f2f3f5;
  margin: 0px;
  padding: 0px;
}
</style>
