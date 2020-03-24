<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in list" :key="index">
        <img class="banner_image" :src="item" alt />
      </van-swipe-item>
    </van-swipe>
    <Kinds />
    <Cart :title= "'名师阵容'" />
    <Cart :title= "'精品课程'" />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import Kinds from "../components/home/kinds";
import Cart from "../components/home/Card";
export default {
  name: "Home",
  components: {
    Kinds,
    Cart,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      list: [
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20197Cxc53hktC1569839552.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20193KAjU2cB6h1569839562.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019LnKumseuhw1569839569.jpg"
      ]
    };
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.banner_image {
  width: 100%;
}
</style>
