<template>
  <div>
    <van-nav-bar title="设置密码" left-arrow @click-left="onClickLeft" />
    <div class="form">
      <div :class="active!= 1 ? 'int_num':'int_num int_num_active'">
        <input
          class="iptuser"
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          v-model="getsmscodeData.mobile"
          @focus="active=1"
          @blur="active=''"
        />
        <div class="getCAPTCHA" v-on:click="getsmsCode" v-if="!timebool">获取验证码</div>
        <div class="getCAPTCHA" v-if="timebool" style="color:#ccc;">获取验证码({{time}})</div>
      </div>
      <div :class="active!= 2 ? 'int_num':'int_num int_num_active'">
        <input
          class="iptsms"
          type="tel"
          placeholder="请输入短信验证码"
          v-model="getsmscodeData.smscode"
          @focus="active=2"
          @blur="active=''"
        />
      </div>
      <div :class="active!= 3 ? 'int_num':'int_num int_num_active'">
        <input
          class="iptsms"
          type="password"
          placeholder="请输入密码"
          v-model="getsmscodeData.pass"
          @focus="active=3"
          @blur="active=''"
        />
      </div>
      <div class="login">
        <span @click="goLogin">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Button,Toast } from "vant";
import { SmsVerification, secondPassword } from "../../request/http";
export default {
  data() {
    return {
      getsmscodeData: {
        mobile: "",
        smscode: "",
        pass: ""
      },
      sms_type: "getPassword",
      time: 60,
      timebool: false,
      active: ""
    };
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Toast.name]:Toast
  },
  methods: {
    goLogin() {
      if (!this.$pub.isPoneAvailable(this.getsmscodeData.mobile)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      if (!this.getsmscodeData.pass || !this.getsmscodeData.smscode) {
        this.$toast("输入有误，请检查");
        return;
      }
      let obj = {
          mobile: this.getsmscodeData.mobile,
          password: this.getsmscodeData.pass,
          sms_code: this.getsmscodeData.smscode
        }
      secondPassword(obj).then(res => {
        console.log(res);
        this.$toast.success({
            message: "设置成功"
          });
          setTimeout(() => {
            this.$router.push('/mine');
          }, 1000);
      });
    },
    getsmsCode() {
      if (!this.$pub.isPoneAvailable(this.getsmscodeData.mobile)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      let obj = {
        mobile: this.getsmscodeData.mobile,
        sms_type: this.sms_type
      };
      SmsVerification(obj).then(res => {
        console.log(res);
        this.timebool = true;
        this.time = 60;
        var timer = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            this.timebool = false;
            clearInterval(timer);
          }
        }, 1000);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.int_num_active {
  border-bottom: 1px red solid !important;
}
.login {
  width: 100%;
  height: 45px;
  margin: 40px auto;
  background: url("../../assets/theme-img/login-btn.png");
  background-size: 100% 100%;
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 4px;
  span {
    display: inline-block;
    width: 100%;
    line-height: 45px;
  }
}
.form {
  width: 90%;
  margin: 0 auto;
  .int_num {
    height: 100%;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 71%;
      box-sizing: border-box;
      padding: 10px 0;
      border: 0;
      height: 100%;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 50px;
      float: left;
      outline: none;
    }

    .getCAPTCHA {
      width: 29%;
      height: 50px;
      margin-right: 10px;
      color: $theme_color;
      border-radius: 3px;
      float: right;
      padding: 0;
      text-align: center;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 50px;
    }
  }
}
</style>