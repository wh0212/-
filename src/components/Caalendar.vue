<template>
  <div class="hante_con">
    <div class="hand_hate">
      <span>{{curYear}}年{{curMonth}}月</span>
      <span class="hate_arrow">
        <van-icon @click="arrow(0)" class="left" name="arrow-left" />
        <van-icon @click="arrow(1)" name="arrow" />
      </span>
    </div>
    <div class="title">
      <div class="cell" v-for="(item, index) in titleList" :key="index">{{item}}</div>
    </div>
    <div class="day">
      <div
        class="dayitem"
        :class="{'pointer': item!==0}"
        v-for="(item, index) in dayList"
        :key="index"
        @click="onClickDay(item)"
      >
        <div
          :class="{'today':item.isToday,select: item.day == selectDay}"
          v-if="item!==0"
          class="text"
        >
          {{item.day}}
          <div :class="{'has-course': hasCourse(item.date)}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: {
    courseDate: {
      //含有课程的日期集合 如['2019-8-1', '2019-8-15']
      type: Array
    },
    firstDay: {
      //周起始日 1到7
      type: Number,
      default: 1,
      validator(val) {
        if (val >= 1 && val <= 7) {
          return true;
        }
        return false;
      }
    }
  },
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      curYear: 2020, //当前年份
      curMonth: 4, //当前月份
      titleList: ["日", "一", "二", "三", "四", "五", "六"],
      Date: new Date(),
      dayOfMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 1-12月的天数
      dayList: [],
      selectDay: 0
    };
  },
  mounted() {
    this.init(this.Date);
    this.$emit(
      "onCurDate",
      `${this.curYear}-${this.curMonth}-${this.Date.getDate()}`
    );
    this.selectDay = this.Date.getDate();
  },
  computed: {
    courseDateSet() {
      const retAry = [];
      this.courseDate.forEach(i => {
        retAry.push(new Date(i.replace(/-/g, "/")));
      });
      return retAry;
    }
  },
  methods: {
    hasCourse(date) {
      for (const i of this.courseDateSet) {
        if (this.isDateEqual(i, date)) {
          return true;
        }
      }
      return false;
    },
    //切换月份
    arrow(v) {
      if (v) {
        this.curYear = this.curMonth + 1 > 12 ? this.curYear + 1 : this.curYear;
        this.curMonth = this.curMonth + 1 > 12 ? 1 : this.curMonth + 1;
        this.selectDay = 0;
        this.init(new Date(`${this.curYear}/${this.curMonth}/1`));
        this.$emit("onChangeDate", `${this.curYear}-${this.curMonth}-1`);
      } else {
        this.curYear = this.curMonth - 1 <= 0 ? this.curYear - 1 : this.curYear;
        this.curMonth = this.curMonth - 1 <= 0 ? 12 : this.curMonth - 1;
        this.selectDay = 0;
        this.init(new Date(`${this.curYear}/${this.curMonth}/1`));
        this.$emit("onChangeDate", `${this.curYear}-${this.curMonth}-1`);
      }
    },
    onClickDay(v) {
      this.selectDay = v.day;
      //   console.log(v);
      this.$emit("onclickDate", `${this.curYear}-${this.curMonth}-${v.day}`);
    },
    init(data) {
      //年份
      this.curYear = data.getFullYear();
      //月份
      this.curMonth = data.getMonth() + 1;
      // 判断是不是闰年
      if (this.isLeapYear(data.getFullYear())) {
        this.dayOfMonth[1] = 29;
      }
      //天数
      const year = data.getFullYear(),
        month = data.getMonth();
      const dayList = [];
      this.dayList = [];
      //当月天数
      const dayCount = this.dayOfMonth[month];
      // 获得本月的1号是周几
      let firstDayWeek = new Date(year, month, 1).getDay();
      firstDayWeek = firstDayWeek == 0 ? 7 : firstDayWeek;
      firstDayWeek = (firstDayWeek - this.firstDay + 7) % 7;
      for (let i = 1; i <= firstDayWeek; ++i) {
        dayList.push(0);
      }
      for (let i = 1; i <= dayCount; ++i) {
        dayList.push(i);
      }
      for (const i of dayList) {
        if (i == 0) {
          this.dayList.push(i);
        } else {
          const date = new Date(year, month, i);
          this.dayList.push({
            date,
            day: i,
            isToday: this.isDateEqual(date, this.Date)
          });
        }
      }
      //   console.log(this.dayList);
    },
    isDateEqual(date1, date2) {
      if (
        date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate()
      ) {
        return true;
      }
      return false;
    },

    isLeapYear(year) {
      if (year % 100 == 0) {
        return year % 400 == 0;
      }
      return year % 4 == 0;
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../assets/CSS/index.scss";

.hand_hate {
  font-size: 22px;
  color: #595959;
  line-height: 60px;
  padding-left: 20px;
  .hate_arrow {
    float: right;
    padding-right: 15px;
    .left {
      margin-right: 20px;
    }
  }
}
.info {
  padding: 0 0 20px 20px;
  .date {
    font-size: 30px;
    color: $theme_color;
    margin-right: 30px;
  }
  .course-count {
    font-size: 24px;
    color: #8c8c8c;
  }
}
.pointer {
  cursor: pointer;
}
.day {
  font-size: 15px;
  color: #595959;
  border: 1px #fff solid;
  .dayitem {
    width: 14.28%;
    height: 45px;
    // display: block;
    float: left;
    text-align: center;
    line-height: 30px;
    position: relative;
    .text {
      margin: 0 auto;
    }
    .today {
      color: $theme_color;
      background-color: $theme_color_light;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .select {
      color: #fff;
      background-color: $theme_color;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .has-course {
      background: $theme_color;
      width: 4px;
      height: 4px;
      margin: 4px auto;
    }
  }
}
.title {
  .cell {
    width: 14.28%;
    height: 40px;
    display: block;
    float: left;
    text-align: center;
    position: relative;
  }
}
</style>
