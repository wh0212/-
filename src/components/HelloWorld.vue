<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>

    <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>
    <van-icon name="chat-o" />
  </div>
</template>

<script>
import { Button, Row, Col,Icon } from "vant";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]:Icon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
