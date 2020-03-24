<template>
  <van-tabbar route v-model="active">
    <van-tabbar-item to="/" icon=" iconfont icon--xiaolu">首页</van-tabbar-item>
    <van-tabbar-item to="/course" icon=" iconfont icon-kecheng">课程</van-tabbar-item>
    <van-tabbar-item to="/record" icon=" iconfont icon-dianji">约课记录</van-tabbar-item>
    <van-tabbar-item to="/practice" icon=" iconfont icon-lianxi">练习</van-tabbar-item>
    <van-tabbar-item to="/mine" icon=" iconfont icon-yonghu">我的</van-tabbar-item>
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