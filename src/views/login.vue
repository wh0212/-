<template>
  <div>
    <div class="logo">
      <img src="../assets/images/login.png" alt />
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
        <div style="margin: 16px;">
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
  },
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  methods: {
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
            Toast.success(res.data.msg);
            this.$router.push("/");
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
.form {
  width: 80%;
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