<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的优惠券" left-arrow></van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  props: {},
  data() {
    return {};
  },
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss" >
</style>
