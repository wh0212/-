<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <van-cell class="cell" is-link @click="showPopup" title="设置密码"></van-cell>
      <div class="button">
        <van-button @click="exit" class="btn" type="default">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, Button } from "vant";
export default {
  data() {
    return {};
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Button.name]: Button
  },
  methods: {
    exit() {
        localStorage.removeItem("adminToken");
      localStorage.removeItem("user_id");
      this.$router.push('/')
    },
    showPopup() {
      this.$router.push("/setnewpass");
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>


<style lang="scss" scoped>
.button {
  width: 90%;
  margin: 60px auto;
}
.btn {
  width: 100%;
  background: #eb6100;
  color: #fff;
  font-size: 17px;
  border-radius: 5px;
}
.content {
  width: 100%;
  height: 200px;
  background: #fff;
  margin-top: 15px;
}
</style>p