<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的学习" left-arrow>
      <template #right>
        <van-icon @click="rili" color="#000" size="20" name="calender-o" />
      </template>
    </van-nav-bar>
    <van-tabs @change="onchange">
      <van-tab v-for="(item,index) in tabs" :key="index" :title="`${item.name}(${item.num})`"></van-tab>
    </van-tabs>
    <div v-if="list.length">
      <mystausItem :data="list" />
    </div>
    <div v-else class="no-login">
      <img src="../../assets/images/empty.png" alt />
      <div>还没有课程，赶快去选择课程吧</div>
      <van-button @click="oninfo" class="info">选择课程</van-button>
    </div>
  </div>
</template>

<script>
import { mystaus } from "../../request/http";
import { NavBar, Icon, Tab, Tabs, Button } from "vant";
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
    [Button.name]: Button,
    mystausItem
  },
  created() {
    this.onmystaus();
  },
  methods: {
    rili(){
      this.$router.push("/studyCalendar")
    },
    oninfo(){
      this.$router.push("/course")
    },
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
.no-login {
  text-align: center;
}
.info {
  background: #eb6100;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  line-height: 30px;
  margin-top: 20px;
}
</style>