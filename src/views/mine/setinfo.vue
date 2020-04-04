<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="修改个人信息" left-arrow>
      <template #right>
        <span @click="setWood">保存</span>
      </template>
    </van-nav-bar>
    <van-cell-group v-if="tag=='nickname'" class="nickname">
      <van-field v-model="value" placeholder="请输入昵称" />
    </van-cell-group>
    <ul class="content" v-else-if="tag=='sex'">
      <li :class="{active:value==0}" @click="onSex(0)">男</li>
      <li :class="{active:value==1}" @click="onSex(1)">女</li>
    </ul>
    <div class="subject" v-else-if="tag == 'subjects'">
      <ul>
        <li v-for="(item,index) in value" :key="index">         
          <input type="checkbox" v-model="sub" :value="item.id">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { user } from "../../request/http";
import { NavBar, Field, CellGroup, Toast, Divider } from "vant";
export default {
  data() {
    return {
      value: this.$route.query.value,
      tag: this.$route.query.tag,
      sub: this.$route.query.select ? this.$route.query.select : []
    };
  },
  mounted(){
      console.log(this.$route.query.name);
      
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Divider.name]: Divider
  },
  methods: {
    onSex(v) {
      this.value = v;
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
        case "subjects":
          var subDate = [];
          this.sub.forEach(res => {
            let d = { attr_id: 2, attr_val_id: res };
            subDate.push(d);
          });
          user({user_attr:JSON.stringify(subDate)}).then(()=>{
            this.$toast("修改成功");
            this.$router.go(-1);
          })
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