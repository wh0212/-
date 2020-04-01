<template>
  <div>
    <div class="hander">
      <div class="hander_content">
        <div class="hander_info">
          <div class="avitar">
            <img class="user_img" :src="userinfo.avatar" alt />
            <img v-if="!user_id" class="user_img" src="../assets/images/user_Headportrait.png" alt />
            <img class="vip-logo" src="../assets/images/皇冠-2 拷贝@2x.png" alt />
          </div>
          <div class="phone">
            {{userinfo.mobile}} &nbsp;
            <img class="xiugai" src="../assets/images/修改@2x.png" alt />
          </div>
          <div class="right">去约课</div>
        </div>
        <div class="hander_mine">
          <ul>
            <li v-for="(item,index) in mineList" :key="index">
              <p class="count">{{item.count}}</p>
              <p class="title">{{item.name}}</p>
              <p class="xq">{{item.note}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Userinfo, UserCenter } from "../request/http";
export default {
  data() {
    return {
      user_id: "",
      userinfo: {},
      mineList: [
        {
          count: 0,
          name: "我的特色课",
          note: "已购特色课程的学习",
          style: "my-study",
          url: "MyStudy"
        },
        {
          count: 0,
          name: "一对一辅导",
          note: "我的一对一老师辅导",
          style: "my-plan",
          url: "Record"
        },
        {
          count: 0,
          name: "剩余学习币",
          note: "查看剩余学习币",
          style: "my-period",
          url: "MyCurrency"
        }
      ]
    };
  },
  created() {
    this.user_id = localStorage.user_id;
    window.scrollTo(0, 0);
    this.turnPage();

    if (this.user_id) {
      this.requestInfo();
    }
  },
  methods: {
    requestInfo() {
      Userinfo().then(res => {
        console.log(res);
        this.userinfo = res;
        this.requestCount();
      });
    },
    requestCount() {
      UserCenter().then(res => {
        console.log(res);
        this.mineList[0].count = res.courses;
        this.mineList[1].count = res.oto;
        this.mineList[2].count = (res.integral/100).toFixed(2);
      });
    },
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
      padding-top: 10px;
      margin-left: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .vip-logo {
        position: absolute;
        left: 55px;
        right: 0px;
        top: 11px;
        width: 20px;
        height: 20px;
      }
      .avitar {
        width: 50px;
        height: 50px;
        border: 1px #777 solid;
        border-radius: 100%;
        overflow: hidden;
        .user_img {
          width: 100%;
        }
      }
      .phone {
        width: 75%;
        float: left;
        font-size: 17px;
        .xiugai {
          width: 15px;
          height: 15px;
        }
      }
      .right {
        position: absolute;
        right: 0;
        width: 55px;
        height: 25px;
        background: #eb6100;
        color: #fff;
        text-align: center;
        line-height: 25px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
    }
    .hander_mine {
      height: 80px;
      width: 90%;
      margin: 0 auto;
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          border: 1px #f1f1f1 solid;
          width: 32%;
          height: 100%;
          text-align: center;
          .count {
            color: #eb6100;
            font-size: 19px;
          }
          .title {
            font-size: 15px;
          }
          .xq {
            line-height: 15px;
            font-size: 12px;
            color: #777;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          p {
            line-height: 5px;
          }
        }
      }
    }
  }
}
</style>