<template>
  <div class="hander">
    <div class="top">
      <div class="hand">
        特色课
        <van-icon class="icon" name="search" />
      </div>
      <div>
        <HandMenu />
      </div>
    </div>
    <div class="content">
      <Courseitem />
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { Icon } from "vant";
import Courseitem from "../components/course/course_item";
import HandMenu from "../components/course/handMenu";
export default {
  components: {
    [Icon.name]: Icon,
    Courseitem,
    HandMenu
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/index.scss";

.icon {
  float: right;
  line-height: 1rem;
  font-weight: 600;
  padding-right: 10px;
}
.hand {
  @include Wm(100%);
  line-height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  background: #fff;
}
</style>