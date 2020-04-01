<template>
  <div>
    <div class="logo">
      <img  src="../assets/images/login.png" alt />
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="others">
          <span class="forget" @click="forgot">找回密码</span>
          <span class="login_CAPTCHA" @click="codeLogin">注册/验证码登录</span>
        </div>
        <div class="btn">
          <van-button color="#fd6614" round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Button, Field, Toast } from "vant";
import { login } from "../request/http";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    document.body.style.background = "#fff";
    // localStorage.removeItem("adminToken");
    // localStorage.removeItem("user_id");
  },
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  methods: {
    forgot() {},
    codeLogin() {
      this.$router.push("/smslogin")
    },
    onSubmit() {
      //?mobile=15083020522&password=123456&type=1
      let obj = {
        mobile: this.username,
        password: this.password,
        type: 1
      };
      login(obj)
        .then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            localStorage.setItem("adminToken", res.data.data.remember_token);
            localStorage.setItem("user_id", res.data.data.id);
            Toast.success(res.data.msg);
            this.$router.push("/mine");
          } else if (res.data.code === 201) {
            Toast.fail(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.btn{
  margin-top: 50px;
}
.others {
  width: 90%;
  display: flex;
  margin: 5px auto;
  justify-content: space-between;
  .forget {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .login_CAPTCHA {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
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