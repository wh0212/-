<template>
  <div>
    <Hander :describe="'查看详情'" :title="'预约课程'" :detailData="teacherData" />
    <div class="content">
      <p class="co_title">选择时间 (北京时间)</p>
      <div class="co_time">
        <div class="opt_block">
          <ul>
            <li v-for="(item,index) in week" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <van-button @click="submit" class="bottom">立即预约</van-button>
  </div>
</template>


<script>
import Hander from "./hander";
import { Button } from "vant";
export default {
  data() {
    return {
      teacherData: {},
      week: [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      ]
    };
  },
  components: {
    [Button.name]: Button,
    Hander
  },
  mounted() {
    // /teacher/35
    this.$http.get(`/teacher/${this.$route.query.id}`).then(res => {
      console.log(res.teacher);
      this.teacherData = res.teacher;
    });
  },
  methods: {
    //预约
    submit() {}
  }
};
</script>


<style lang="scss" scoped>
.bottom {
  width: 100%;
  height: 45px;
  background: #eb6100;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 45px;
  color: #fff;
  font-size: 16px;
}
.content {
  margin-top: 65px;
  width: 95%;
  margin: 65px auto;
  .co_title {
    font-size: 14px;
    padding-left: 10px;
    border-left: 3px orange solid;
  }
  .co_time {
    margin: 0 auto;
    width: 100%;
    height: 74px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 0 20px;
    overflow: auto;
    display: flex;
    box-sizing: border-box;
    .opt_block {
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      ul {
        display: flex;
        align-items: center;
        li {
          width: 59px;
          height: 62px;
        }
      }
    }
  }
}
</style>