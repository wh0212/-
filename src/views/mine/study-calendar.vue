<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="学习日历" left-arrow></van-nav-bar>
    <Calendar
      :firstDay="7"
      :courseDate="courseDate"
      @onChangeDate="changeDate"
      @onclickDate="clickDate"
      @onCurDate="CurDate"
    />
    <div class="info">
      <span class="date">{{curDate}}</span>
      <span class="course-count">当天{{courseList.length}}节课</span>
    </div>
    <div>
      <CalendList :courseList="courseList" />
    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import Calendar from "../../components/Caalendar";
import CalendList from "./CalendarList";
import { myrili, myrlisutdy } from "../../request/http";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    Calendar,
    CalendList
  },
  data() {
    return {
      curDate: "",
      courseList: [],
      courseDate: []
    };
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  methods: {
    clickDate(v) {
      console.log(v);
      this.changeCurDate(v);
      this.requestCourse(v);
    },
    CurDate(v) {
      console.log(v);
      this.changeCurDate(v);
      this.requestCourse(v);
      this.requestCourseDate(v);
    },
    changeDate(v) {
      console.log(v);
      this.changeCurDate(v);
      this.requestCourseDate(v);
    },
    changeCurDate(date) {
      const ary = date.split("-");
      this.curDate = ary[1] + "月" + ary[2] + "日";
    },
    requestCourseDate(date) {
      myrlisutdy(date).then(res => {
        console.log(res);
        this.courseDate = [];
        for (const i in res) {
          this.courseDate.push(res[i]);
        }
        console.log(this.courseDate);
      });
    },
    requestCourse(date) {
      // 解决浏览器兼容问题，chrome浏览器可以识别 '2019-8-1' 格式，但是safari无法识别；'2019/8/1' 格式才是兼容的
      date = date.replace(/-/g, "/");
      const timestamp = parseInt(new Date(date).getTime() / 1000);
      console.log(timestamp);
      myrili(timestamp).then(res => {
        console.log(res);
        this.courseList = res;
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

.info {
  clear: both;
  width: 100%;
  height: 35px;
  padding-left: 20px;
  .date {
    font-size: 16px;
    color: $theme_color;
    margin-right: 0px;
  }
  .course-count {
    font-size: 16px;
    color: #8c8c8c;
  }
}
</style>
