<template>
  <div>
    <div class="top">
      <div class="hander">
        <div>给我们留言</div>
        <div @click="off">关闭</div>
      </div>
      <div class="xq">您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题</div>
      <div class="from">
        <ul>
          <li>
            <div>手机</div>
            <p>
              <input placeholder="请输入" type="text" name id />
            </p>
          </li>
          <li>
            <div>
              留言内容
              <span style="color:red">*</span>
            </div>
            <p>
              <input placeholder="请输入" type="text" name id />
            </p>
          </li>
        </ul>
      </div>
      <van-button class="btn" type="info">信息按钮</van-button>
    </div>
    
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  data() {
    return {};
  },
  components: {
    [Button.name]: Button
  },
  methods: {
    off() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn{
  width: 95%;
  margin-left: 10px;
}
.from {
  ul {
    li {
      div {
        padding-left: 10px;
      }
      input {
        width: 100%;
        height: 35px;
        border: none;
        padding-left: 10px;
      }
    }
  }
}
.xq {
  width: 95%;
  margin: 15px auto;
  height: 60px;
  color: #777;
}
.top {
  width: 100%;
  height: 60px;
  background: #007aff;
}
.hander {
  width: 95%;
  margin: 0 auto;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 60px;
}
</style>