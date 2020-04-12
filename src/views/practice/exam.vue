<template>
  <div>
    <van-nav-bar title="仿真模考" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="Search" class="search" name="search" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu :active-color="$theme_color">
      <van-dropdown-item title="考试类型" />
      <van-dropdown-item title="考试状态" />
      <van-dropdown-item title="参考状态" />
    </van-dropdown-menu>
  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem } from "vant";
import { examlist } from "../../request/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      state: [
        { key: "0", value: "全部" },
        { key: "1", value: "已做" },
        { key: "2", value: "未做" }
      ],
      start_status: [
        { key: "0", value: "全部" },
        { key: "2", value: "未开始" },
        { key: "1", value: "进行中" },
        { key: "3", value: "已结束" }
      ],
      exam_type: [
        { key: "0", value: "全部" },
        { key: "1", value: "模拟考试" },
        { key: "2", value: "正式考试" }
      ],
      list: []
    };
  },
  mounted() {
    this.getexamlist();
  },
  methods: {
    getexamlist() {
      examlist().then(res => {
        console.log(res);
        this.list = res.list;
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
.search {
  font-size: 18px;
  color: #000;
}
</style>
