<template>
  <div>
    <div class="logo">
      <img src="../../assets/images/login.png" alt />
    </div>
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
      <div class="others">
        <span class="forget">*未注册的手机号将自动注册</span>
        <span class="login_CAPTCHA" @click="$router.go(-1)">使用密码登录</span>
      </div>
      <div class="login">
        <span @click="goLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Button, Field, Toast } from "vant";
import { SmsVerification, VerificationLogin } from "../../request/http";
export default {
  data() {
    return {
      getsmscodeData: {
        mobile: "",
        sms_type: "login",
        smscode: ""
      },
      time: 60,
      timebool: false,
      type: "",
      active: "",
      showOther: false
    };
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  methods: {
    getsmsCode() {
      //正则效验
      if (!this.$pub.isPoneAvailable(this.getsmscodeData.mobile)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      let obj = {
        mobile: this.getsmscodeData.mobile,
        sms_type: this.getsmscodeData.sms_type
      };
      SmsVerification(obj).then(res => {
        console.log(res);
        this.timebool = true;
        this.time = 60;
        let _this = this;
        var timer = setInterval(function() {
          _this.time--;
          if (_this.time <= 0) {
            _this.timebool = false;
            clearInterval(timer);
          }
        }, 1000);
      });
    },
    goLogin() {

      VerificationLogin({
        mobile: this.getsmscodeData.mobile,
        sms_code: this.getsmscodeData.smscode,
        type: 2
      }).then(res => {
        console.log(res);
        // if (res.is_new == 1) {
          this.$store.commit("smslogin", {
            mobile: this.getsmscodeData.mobile,
            sms_code: this.getsmscodeData.smscode
          });
          this.$router.push("/setpass");
        // }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
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
.others {
  width: 95%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .forget {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #b7b7b7;
  }
  .login_CAPTCHA {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
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
.int_num_active {
  border-color: $theme_color;
}
.form {
  width: 83%;
  margin: 0 auto;
}
.logo {
  width: 70%;
  height: 51px;
  margin: 60px auto;
  img {
    width: 100%;
  }
}
</style>