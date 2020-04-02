<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的学习" left-arrow>
      <template #right>
        <van-icon color="#000" size="20" name="calender-o" />
      </template>
    </van-nav-bar>
    <van-tabs @change="onchange">
      <van-tab v-for="(item,index) in tabs" :key="index" :title="`${item.name}(${item.num})`"></van-tab>
    </van-tabs>
    <div v-if="list.length">
      <mystausItem :data="list" />
    </div>
    <div v-else class="no-login">
        <img src="../../assets/images/empty.png" alt="">
      <div class="info">选择课程</div>
    </div>
  </div>
</template>

<script>
import { mystaus } from "../../request/http";
import { NavBar, Icon, Tab, Tabs } from "vant";
import mystausItem from "../../components/mine/mystausitem";
export default {
  data() {
    return {
      type: 2,
      list: [],
      tabs: []
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    mystausItem
  },
  created() {
    this.onmystaus();
  },
  methods: {
    onmystaus() {
      mystaus(this.type).then(res => {
        console.log(res);
        this.list = res.courseList;
        this.tabs = res.typeNum;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onchange(index) {
      this.type = this.tabs[index].type;
      this.onmystaus();
    }
  }
};
</script>

<style lang="scss" scoped>
.no-login{
    text-align: center;
}
</style>