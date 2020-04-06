<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的关注" left-arrow></van-nav-bar>
    <div class="img" v-if="list.length==0">
      <img src="../../assets/images/empty.png" alt />
      <p>暂无关注</p>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  props: {},
  data() {
    return {
      list: []
    };
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

<style scoped >
.img {
  text-align: center;
}
</style>
