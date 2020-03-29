<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="学习日历" left-arrow>
      <template #right>
        <van-icon color="#000" size="20" name="search" />
      </template>
    </van-nav-bar>
    <div>
      <Calender
        :firstDay="7"
        :courseDate="courseDate"
        @onCurDate="onCurDate"
        @onChangeDate="onChangeDate"
        @onClickDay="onClickDay"
      />
    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import Calender from "../../components/Calendar";
export default {
  data() {
    return {
      courseDate: [],
      courseList: [],
      curDate: '',
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    Calender
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
     onCurDate(date) {
      this.requestCourseDate(date)
      this.requestCourse(date)
      this.changeCurDate(date)
    },
    onChangeDate(date) {
      this.requestCourseDate(date)
      this.courseList = []
      this.changeCurDate(date)
    },
    onClickDay(date) {
      this.requestCourse(date)
      this.changeCurDate(date)
    },
    // other
    changeCurDate(date) {
      const ary = date.split('-')
      this.curDate = ary[1] + '月' + ary[2] + '日'
    },
    requestCourseDate(date) {
      // this.$http.get('/api/app/study/schedule', {
      //   date: date
      // }).then(data => {
      //   this.courseDate = []
      //   for (const i in data) {
      //     if (!data[i]) continue
      //     this.courseDate.push(data[i])
      //   }
      // })
    },
    requestCourse(date) {
      // 解决浏览器兼容问题，chrome浏览器可以识别 '2019-8-1' 格式，但是safari无法识别；'2019/8/1' 格式才是兼容的
      date = date.replace(/-/g, '/')
      const timestamp = parseInt(new Date(date).getTime() / 1000)
      // this.$http.get(`/api/app/study/live/${timestamp}`).then(data => {
      //   this.courseList = data
      // })
    }
  }
};
</script>


<style lang="scss" scoped>
</style>