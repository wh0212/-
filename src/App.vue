<template>
  <div id="app">
    <router-view />
    <van-button class="Customer" to="/custmoer" size="normal" round type="info">
      <i class="iconfont icon-xin"></i>
    </van-button>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  mounted() {
    document.body.style.background = "#f2f3f5";
  },
  components: {
    [Button.name]: Button
  },
  data() {
    return {};
  }
};
</script>


<style >
@import "./styles/iconfont.wxss";
.iconfont {
  font-size: 30px;
}
.Customer {
  position: fixed;
  bottom: 80px;
  right: 10px;
  width: 60px;
  height:60px;
}
</style>
