<template>
  <div class="hander">
    <div class="hand">
      特色课
      <van-icon class="icon" name="search" />
    </div>
    <div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" title="分类">
          <div class="about">
            <p>年级</p>
            <ul>
              <li v-for="(item,index) in 4" :key="index">{{index}}</li>
            </ul>
          </div>
          <van-divider />
          <div class="btn">
            <van-button plain size="small" class="btn_item" block type="info">重置</van-button>
            <van-button color="#eb6100" size="small" class="btn_item" block type="info">确认</van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item v-model="value2" title="排序" />
        <van-dropdown-item title="筛选" ref="item">22</van-dropdown-item>
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import { Icon, DropdownMenu, DropdownItem, Button, Divider } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    [Divider.name]: Divider
  },
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: 0
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/index.scss";

.about {
  @include Wm(95%);
  ul {
    display: flex;
    justify-content: space-around;
    li {
      width: 2rem;
      height: 0.8rem;
      @include BgC(#f5f5f5, #646464);
      text-align: center;
      line-height: 0.7rem;
      border-radius: 3px;
      margin: 7px;
    }
  }
}
.btn_item {
  width: 40%;
  color: #000;
}
.btn {
  @include Wm(95%);
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
}
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
  @include Wm(95%);
  line-height: 1rem;
  text-align: center;
  font-size: 0.5rem;
}
</style>