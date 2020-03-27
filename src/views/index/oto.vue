<template>
  <div>
    <div class="top">
      <van-nav-bar @click-left="onClickLeft" title="一对一辅导" left-arrow>
        <template #right>
          <van-icon color="#000" size="20" name="search" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <div class="options">
        <ul>
          <li
            @click="toggle(item)"
            :class="{'act':item.active}"
            v-for="(item, index) in opt"
            :key="index"
          >
            {{item.title}}
            <van-icon v-show="!item.active" name="arrow-down" />
            <van-icon v-show="item.active" name="arrow-up" />
          </li>
        </ul>
      </div>
      <div>
        <component :obj="conditionobj" @off="off" :list="otoList" :is="comm"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Tab, Tabs } from "vant";
// import { oto, otoconditon } from "../../request/http";
import TeachList from "../../components/oto/teachList";
import Time from "../../components/oto/time";
import Condition from "../../components/oto/condition";
export default {
  name: "oto",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    TeachList,
    Time,
    Condition
  },
  data() {
    return {
      otoList: [],
      comm: TeachList,
      opt: [
        {
          title: "选择上课时间",
          active: false,
          comm: "Time"
        },
        {
          title: "选择老师条件",
          active: false,
          comm: "Condition"
        }
      ],
      conditionobj:{}
    };
  },
  mounted() {
    
    this.$http.get('/otoCourse').then(res => {
      console.log(res);
      this.otoList = res;
    });
  
    this.$http.get('/otoCourseOptions').then(res => {
      console.log(res);
      this.conditionobj = res
    });
  },
  methods: {
    off() {
      this.comm = "TeachList";
      this.opt.map(v => (v.active = false));
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    toggle(item) {
      if (item.active) {
        this.comm = "TeachList";
        this.opt.map(v => (v.active = false));
        return;
      }
      this.opt.map(v =>
        v.comm == item.comm ? (v.active = true) : (v.active = false)
      );
      this.comm = item.comm;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.act {
  color: #eb6100 !important;
}

.options {
  margin-top: 45px;
  @include SizeBack(100%, 45px, #fff);
  ul {
    display: flex;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      line-height: 45px;
      font-size: 15px;
      color: #777;
    }
  }
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>