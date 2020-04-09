<template>
  <div>
    <van-calendar
      @confirm="off"
      :poppable="false"
      :show-confirm="false"
      :show-mark="false"
      :show-title="false"
      :style="{ height: '280px' }"
    />
    <div class="time-rinle">
      <p class="time-block">时段</p>
      <div class="tr-ipt">
        <p @click="openPicker('startTime')">
          <input placeholder="开始时间" :value="studyTime.startTime" disabled="disabled" />
          <i></i>
        </p>
        <font>-</font>
        <p @click="openPicker('endTime')">
          <input placeholder="结束时间" :value="studyTime.endTime" disabled="disabled" />
          <i></i>
        </p>
      </div>
    </div>
    <div class="botom">
      <div class="reset">重置</div>
      <div @click="ensure" class="fix">确定</div>
    </div>
    <van-popup v-model="timeShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentTime"
        type="time"
        :min-hour="0"
        :max-hour="23"
        @confirm="successHanlder"
        @cancel="timeShow=false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Calendar, Cell, Popup, DatetimePicker } from "vant";

export default {
  data() {
    return {
      date: "",
      tiem: "",
      timeShow: false,
      currentTime: "",
      timeChoose:"",
      studyTime: {
        startTime: "",
        endTime: "",
        init: function() {
          this.startTime = "";
          this.endTime = "";
        }
      }
    };
  },
  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  },
  methods: {
    successHanlder(val) {
      console.log(val);

      this.studyTime[this.timeChoose] = val;
      this.timeShow = false;
    },
    openPicker(name) {
      this.currentTime = this.studyTime[name];
      this.timeChoose = name;
      this.timeShow = true;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.date = this.formatDate(date);
    },
    off(v) {
      this.tiem = v;
    },
    ensure() {
      console.log(this.tiem);
      this.$emit("off");
    },
    getParams(){
      
    }
  }
};
</script>

<style lang="scss" scoped>
.time-rinle {
  margin-top: 15px;
  height: 108px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  .time-block {
    font-size: 15px;
    padding-left: 10px;
    padding-top: 10px;
  }
  .tr-ipt {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: -9px;
    p {
      width: 190px;
      height: 35px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      border: 2px solid rgba(191, 191, 191, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        border: none;
        width: 100px;
        height: 31px;
        line-height: 50px;
        font-size: 16px;
        padding-left: 20px;
      }
      i {
        width: 20px;
        height: 20px;
        background: url("../../assets/images/icon-time.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 6px;
      }
    }
    font {
      width: 50px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: rgba(183, 183, 183, 1);
      font-size: 25px;
    }
  }
}
.botom {
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  .fix {
    background: #eb6100;
    color: #fff;
  }
  .reset {
    color: #eb6100;
    background: #fff;
  }
  div {
    flex: 1;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
  }
}
</style>