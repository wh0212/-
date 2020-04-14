<template>
  <div>
    <van-nav-bar title="题错记录" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="Search" class="search" name="search" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem, List } from "vant";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List
  },
  data() {
    return {};
  },
  methods: {
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
