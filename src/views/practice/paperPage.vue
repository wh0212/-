<template>
  <div>
    <van-nav-bar title="套卷练习" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon class="search" name="search" />
      </template>
    </van-nav-bar>
    <div class="course-fitler">
      <van-dropdown-menu :active-color="$theme_color">
        <van-dropdown-item title="套卷分类" ref="classify_id">
          <van-tree-select
            :items="classifyList"
            :main-active-index="mainActiveIndex"
            :active-id="activeId"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </van-dropdown-item>
        <van-dropdown-item title="套卷状态" ref="done_status">
          <ul class="course-sort">
            <li
              :class="searchParams.done_status == item.key ? 'active':''"
              v-for="item in state"
              :key="item.key"
              @click="selectType('done_status',item.key)"
            >{{item.value}}</li>
          </ul>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import "../../assets/CSS/index.scss";
import {
  NavBar,
  Icon,
  DropdownMenu,
  DropdownItem,
  Sidebar,
  SidebarItem,
  TreeSelect,
  Divider
} from "vant";
import { classify } from "../../request/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [TreeSelect.name]: TreeSelect,
    [Divider.name]: Divider
  },
  data() {
    return {
      activeKey: 0,
      classifyList: [],
      switch1: "",
      state: [
        { key: "0", value: "全部" },
        { key: "1", value: "已做" },
        { key: "2", value: "未做" }
      ],
      mainActiveIndex: 0,
      //分类选中元素的id
      activeId: "",
      searchParams: {
        done_status: 0,
        classify_id: 0,
        name: ""
      }
    };
  },
  mounted() {
    this.getclassify();
  },
  methods: {
    selectType(name, val) {
      console.log(name, val);
      this.$refs[name].toggle();
      this.searchParams[name] = val;
    },
    onClickNav(index) {
      this.mainActiveIndex = index;
      if (!this.classifyList[index].children) {
        this.selectType("classify_id", this.classifyList[index].id);
      }
    },
    onClickItem(data) {
      this.activeId = data.id;
    },
    getclassify() {
      classify().then(res => {
        res.rows.forEach(item => {
          item.text = item.label;
          item.children &&
            item.children.forEach(it => {
              it.text = it.label;
            });
        });
        res.rows.unshift({
          text: "全部",
          id: "0"
        });
        this.classifyList = res.rows;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss" >
@import "../../assets/CSS/index.scss";
.active {
  color: chocolate;
}
.course-sort {
  li {
    line-height: 40px;
    text-align: center;
    font-size: 14.5px;
    border-bottom: 1px #eee solid;
  }
}
.classright {
  position: absolute;
  left: 90px;
  top: 0;
  float: right;
}
.search {
  font-size: 18px;
  color: #000;
}
</style>
