<template>
  <div>
    <van-nav-bar title="设置密码" @click-right="onClickRight">
      <template #right>跳过</template>
    </van-nav-bar>
    <div class="from">
      <van-field type="password" class="inp" @blur="blur" @focus="focus" v-model="password" placeholder="请设置登录密码" />
      <van-field type="password" class="inp" @blur="blur" @focus="focus" v-model="secondPassword" placeholder="请确认登录密码" />
    </div>
    <div class="login">
      <span @click="goLogin">确定</span>
    </div>
  </div>
</template>


<script>
import { NavBar, Field, Toast } from "vant";
import { secondPassword } from "../../request/http";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data() {
    return {
      password: "",
      secondPassword: ""
    };
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  methods: {
    onClickRight() {
      this.$router.push("/setmessage");
    },
    goLogin() {
      if (this.password == this.secondPassword) {
        console.log(this.$store.state.smslogin);
        let data = this.$store.state.smslogin;
        data.password = this.secondPassword;
        secondPassword(data).then(res => {
          console.log(res);
          this.$toast("设置成功");
          this.$router.push("/setmessage");
        });
      } else {
        this.$toast("两次输入的密码不相同");
      }
    },
    focus(e) {
      e.target.style.borderBottom = "1px red solid";
    },
    blur(e) {
      e.target.style.borderBottom = "none";
    }
  }
};
</script>


<style lang="scss" scoped>
.inp {
  line-height: 50px;
}
.login {
  width: 85%;
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
.from {
  width: 95%;
  margin: 0 auto;
}
</style>