<template>
  <div class="home">
    <router-view />
    <van-button class="Customer" to="/custmoer" size="normal" round type="info">
      <i class="iconfont icon-xin"></i>
    </van-button>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar";
import { Button } from "vant";
export default {
  name: "Home",
  components: {
    Tabbar,
    [Button.name]: Button
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>

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
</style>
