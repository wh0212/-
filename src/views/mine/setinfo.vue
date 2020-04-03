<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="修改个人信息" left-arrow>
      <template #right>
        <span @click="setWood">保存</span>
      </template>
    </van-nav-bar>
    <van-cell-group v-if="tag=='nickname'" class="nickname">
      <van-field v-model="name" placeholder="请输入昵称" />
    </van-cell-group>
    <ul class="content" v-if="tag=='sex'">
      <li :class="{active:name==0}" @click="onSex(0)">男</li>
      <li :class="{active:name==1}" @click="onSex(1)">女</li>
    </ul>
  </div>
</template>

<script>
import { user } from "../../request/http";
import { NavBar, Field, CellGroup, Toast, Divider } from "vant";
export default {
  data() {
    return {
      name: "",
      tag: ""
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Divider.name]: Divider
  },
  mounted() {
    (this.name = this.$route.query.data), (this.tag = this.$route.query.value);
  },
  methods: {
    onSex(v) {
      this.name = v;
    },
    setWood() {
      console.log(this.name);
      switch (this.tag) {
        case "nickname":
          if (!this.name) {
            this.$toast("昵称不能为空");
            return;
          }
          user({ nickname: this.name }).then(() => {
            this.$toast("修改成功");
            this.$router.go(-1);
          });
          break;
        case "sex":
          if (this.name) this.name = 1;
          else this.name = 0;
          user({ sex: this.name }).then(() => {
            this.$toast("修改成功");
            this.$router.go(-1);
          });
          break;
        default:
          break;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 15px;
  width: 100%;
  background: #fff;
  li {
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #595959;
    position: relative;
    padding-right: 30px;
  }
  .active {
    background: url("~@/assets/theme-img/icon-check.png") no-repeat right center;
    background-size: 15px 15px;
    margin-right: 20px;
  }
}

.nickname {
  width: 100%;
  height: 45px;
  background: #fff;
  margin-top: 15px;
}
</style>