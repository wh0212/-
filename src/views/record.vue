<template>
  <div>
    <van-nav-bar title="约课记录" />
    <van-tabs title-active-color="#eb6100" color="#eb6100" v-model="active">
      <van-tab title="待上课">待上课</van-tab>
      <van-tab title="已上课">已上课</van-tab>
      <van-tab title="已取消">已取消</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from "vant";
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>