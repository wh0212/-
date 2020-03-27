<template>
  <van-tabbar active-color="#fd6103" route v-model="active">
    <van-tabbar-item to="/index" class="a" icon=" iconfont icon--xiaolu">首页</van-tabbar-item>
    <van-tabbar-item to="/course" icon=" iconfont icon-kecheng">课程</van-tabbar-item>
    <van-tabbar-item to="/record" icon=" iconfont icon-dianji">约课记录</van-tabbar-item>
    <van-tabbar-item to="/practice" icon=" iconfont icon-lianxi">练习</van-tabbar-item>
    <van-tabbar-item to="/login" icon=" iconfont icon-yonghu">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss">

.icon--xiaolu{
  font-size: 19px !important;
}
.icon-kecheng{
  font-size: 19px !important;
}
.icon-dianji{
  font-size: 19px !important;
}
.icon-lianxi{
  font-size: 19px !important;
}
.icon-yonghu{
  font-size: 19px !important;
}
</style>