<template>
  <div>
    <ul class="staus">
      <li v-for="(item,index) in data" :key="index">
        <p class="title">{{item.title}}</p>
        <p class="cource_xq">
          <van-icon class="icon" name="clock-o" />
          {{item.start_play_date | fomartTime('MM月dd日 hh:mm')}} ~ {{item.end_play_date | fomartTime('MM月dd日 hh:mm')}} |
          共{{item.section_num}}课时
        </p>
        <div class="hour">
          <div class="hour_tiem"></div>
          <span class="hour_xq">已学习{{item.progress_rate}}%</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
    [Icon.name]: Icon
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.hour_xq{
    padding-left: 10px;
}
.hour_tiem{
    width: 90px;
    height: 4px;
    background: #eee;
}
.hour {
  color: #777;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.cource_xq {
  padding-left: 10px;
  //   margin-top: -10px;
  display: flex;
  align-items: center;
  color: #777;
  .icon {
    margin-right: 5px;
  }
}
.staus {
  width: 90%;
  margin: 0 auto;
  li {
    border: 1px rgb(230, 230, 230) solid;
    height: 127px;
    margin-top: 15px;
    border-radius: 5px;
    .title {
      font-size: 16px;
      padding-left: 10px;
    }
  }
}
</style>