<template>
  <div>
    <van-nav-bar title="仿真模考" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="Search" class="search" name="search" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu :active-color="$theme_color">
      <van-dropdown-item title="考试类型" ref="class">
        <ul>
          <li
            :class="{act1:act1==item.key}"
            class="liItem"
            v-for="(item) in state"
            :key="item.key"
            @click="onli('class',item)"
          >{{item.value}}</li>
        </ul>
      </van-dropdown-item>
      <van-dropdown-item title="考试状态" ref="act">
        <ul>
          <li
            :class="{act1:act1==item.key}"
            class="liItem"
            v-for="(item,index) in start_status"
            :key="index"
            @click="onli('act',item)"
          >{{item.value}}</li>
        </ul>
      </van-dropdown-item>
      <van-dropdown-item title="参考状态" ref="act2">
        <ul>
          <li
            :class="{act1:act1==item.key}"
            class="liItem"
            v-for="(item,index) in exam_type"
            :key="index"
            @click="onli('act2',item)"
          >{{item.value}}</li>
        </ul>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <Examlist comType="Exam" :data="list" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem, List } from "vant";
import { examlist } from "../../request/http";
import Examlist from "../../components/ExamList";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    Examlist
  },
  data() {
    return {
      state: [
        { key: 0, value: "全部" },
        { key: 1, value: "已做" },
        { key: 2, value: "未做" }
      ],
      start_status: [
        { key: 0, value: "全部" },
        { key: 1, value: "未开始" },
        { key: 2, value: "进行中" },
        { key: 3, value: "已结束" }
      ],
      exam_type: [
        { key: 0, value: "全部" },
        { key: 1, value: "模拟考试" },
        { key: 2, value: "正式考试" }
      ],
      list: [],
      loading: false,
      finished: false,
      act1: 0,
      act2: 0,
      act3: 0
    };
  },
  mounted() {
    this.getexamlist();
  },
  methods: {
    onli(v, item) {
      switch (v) {
        case "class":
          console.log(item);
          break;
      }
      this.$refs[v].toggle();
    },
    onLoad() {},
    getexamlist() {
      examlist().then(res => {
        console.log(res);
        this.list = res.list;
        this.finished = true;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    Search() {}
  }
};
</script>

<style lang="scss" scoped >
@import "../../assets/CSS/index.scss";

.content {
  width: 95%;
  margin: 15px auto;
}
.liItem {
  line-height: 35px;
  text-align: center;
  border-bottom: 1px rgb(241, 241, 241) solid;
}
.act1 {
  color: $theme_color;
}
.search {
  font-size: 18px;
  color: #000;
}
</style>
