<template>
  <div class="hander">
    <div class="hand">
      特色课
      <van-icon class="icon" name="search" />
    </div>
    <div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import { Icon, DropdownMenu, DropdownItem } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: 0,
      option1: [
        { text: "分类", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      option3: [
        { text: "筛选", value: 0 },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.hander {
  width: 100%;
  height: 2rem;
  background: #fff;
}
.icon {
  float: right;
  line-height: 1rem;
  font-weight: 600;
}
.hand {
  width: 95%;
  line-height: 1rem;
  margin: 0 auto;
  text-align: center;
  font-size: 0.5rem;
}
</style>