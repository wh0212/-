<template>
  <div>
    <van-nav-bar title="信息填写" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <van-cell class="cell" is-link @click="showPopup" title="昵称" :value="userinfo.nickname"></van-cell>
      <van-cell class="cell" is-link @click="showPopup" title="性别" value="保密"></van-cell>
      <van-cell class="cell" is-link @click="showPopup('born')" title="出生日期" value="请选择">
        <span v-if="data.time">{{data.time}}</span>
      </van-cell>
      <van-cell class="cell" is-link @click="showPopup('city')" title="所在城市" value="请选择">
        <span
          v-show="data.city.length!=0"
          v-for="(item,index) in data.city"
          :key="index"
        >{{item.name}},</span>
      </van-cell>
      <van-cell class="cell" is-link @click="showPopup" title="学科"></van-cell>
      <van-cell class="cell" is-link @click="showPopup('grade')" title="年级" value="请选择">
        <span v-if="data.grade">{{data.grade}}</span>
      </van-cell>
      <van-action-sheet v-model="act">
        <van-datetime-picker
          v-if="show=='born'"
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="quxiao"
          @confirm="ok"
        />
        <van-area v-if="show=='city'" :area-list="areaList" @cancel="quxiao" @confirm="okcity" />
        <van-picker
          v-if="show=='grade'"
          show-toolbar
          :columns="attrs"
          @cancel="quxiao"
          @confirm="gradeok"
        />
      </van-action-sheet>
    </div>
    <div class="btn">
      <van-button @click="add" color="#fd6614" block type="info">提价信息</van-button>
    </div>
  </div>
</template>

<script>
import city from "../../util/city";
import {
  NavBar,
  Cell,
  Button,
  DatetimePicker,
  ActionSheet,
  Area,
  Picker,
  Popup
} from "vant";
import { Userinfo, attr, user } from "../../request/http";
export default {
  data() {
    return {
      userinfo: {},
      show: "",
      act: false,
      minDate: new Date(1700, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      areaList: city,
      attrs: [],
      discipline: [],
      data: {
        grade: "",
        city: [],
        time: ""
      }
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]: ActionSheet,
    [Area.name]: Area,
    [Picker.name]: Picker,
    [Popup.nmae]: Popup
  },
  created() {
   
    this.requestUserInfo();
    attr().then(res => {
      res.forEach(i => {
        if (i.value.length == 0) {
          return false;
        }
        if (i.id == 1) {
          i.value.forEach(ci => {
            this.attrs.push(ci.name);
          });
        }
        if (i.id == 2) {
          i.value.forEach(ci => {
            this.discipline.push(ci.name);
          });
        }
      });
    });
  },
  methods: {
    quxiao() {
      this.show = "";
      this.act = false;
    },
    ok(v) {
      let youWant =v.getFullYear() + "-" +(v.getMonth() + 1) + "-" + v.getDate();

      this.data.time = youWant;
      this.act = false;
    },
    okcity(v) {
      this.act = false;
      this.data.city = v;
    },
    gradeok(v) {
      this.act = false;
      this.data.grade = v;
    },
    requestUserInfo() {
      Userinfo().then(res => {
          console.log(res);
          
        this.userinfo = res;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup(v) {
      if (v == "born") {
        this.show = v;
        this.act = true;
      } else if (v == "city") {
        this.show = v;
        this.act = true;
      } else if (v == "grade") {
        this.show = v;
        this.act = true;
      }
    },
    add() {
        this.userinfo.birthday=this.data.time
        this.userinfo.city_id=this.data.city[1].code
        this.userinfo.city_name=this.data.city[1].name
        this.userinfo.district_id=this.data.city[2].code
        this.userinfo.district_name = this.data.city[2].name
      user(this.userinfo).then(res => {
        console.log(res);
        this.$toast("数据更新成功");
        this.$router.push('/mine')
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.btn {
  margin: 80px auto;
  width: 95%;
}
.cell {
  height: 50px;
}
.content {
  margin-top: 15px;
}
</style>