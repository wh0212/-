<template>
  <div>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item,index) in list" :key="index">
          <img class="banner_image" :src="item" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <Kinds />
    </div>
    <Cart :data="item" v-for="(item,index) in cartlist" :key="index"></Cart>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import Kinds from "../components/home/kinds";
import Cart from "../components/home/Card";
import { appIndex } from "../request/http";
export default {
  components: {
    Kinds,
    Cart,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  mounted() {
    appIndex().then(res => {
        // console.log(res.data.data);
        
      this.cartlist = res.data.data;
    });
  },
  data() {
    return {
      cartlist: [],
      list: [
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20197Cxc53hktC1569839552.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20193KAjU2cB6h1569839562.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019LnKumseuhw1569839569.jpg"
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.bottom{
    height: 60px;
}
.swiper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 51%;
}
.banner_image {
  width: 100%;
}
</style>