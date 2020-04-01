<template>
  <div>
    <div class="hander">
      <div class="hander_content">
        <div class="hander_info"></div>
        <div class="hander_mine"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: ""
    };
  },
  created() {
    this.user_id = localStorage.user_id;
    window.scrollTo(0, 0);
    this.turnPage()
  },
  methods: {
    turnPage(name, query) {
      if (!this.user_id) {
        // 未登录 统一推到验证码登录页面
        this.$router.push({
          name: "login"
        });
        return;
      }

      // this.$router.push({
      //   name,
      //   query
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.hander {
  width: 100%;
  height: 218px;
  background: url("../assets/theme-img/user_bg.png") no-repeat top;
  background-size: 100%;
  position: relative;
  .hander_content {
    position: absolute;
    width: 90%;
    height: 173px;
    background: #fff;
    left: 18px;
    top: 45px;
    border-radius: 5px;
    .hander_info {
      width: 95%;
      height: 70px;
      border: 1px red solid;
      padding-top: 10px;
      margin-left: 15px;
    }
    .hander_mine {
      height: 80px;
      border: 1px red solid;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>