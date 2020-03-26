<template>
  <div>
    <van-nav-bar title="练习" />
    <div class="question"></div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data() {
    return {
      quesList:[
        {
          image:require("../assets/images/exam-point.png"),
          title:"考点专练"
        },
        {
          image:require("../assets/images/paper-package.png"),
          title:"套卷练习"
        },
        {
          image:require("../assets/images/exam.png"),
          title:"仿真模考"
        },
        {
          image:require("../assets/images/wrong-test.png"),
          title:"错题练习"
        }
      ]
    }
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/CSS/index.scss";
.question {
  width: 95%;
  margin: 15px auto;
  height: 179px;
  background: #fff;
  border-radius: 5px;
}
</style>