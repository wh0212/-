<template>
  <div>
    <div v-if="detailShow">
      <van-nav-bar @click-left="onClickLeft(0)" title="我的余额" left-arrow>
        <template #right>
          <div @click="detail">余额明细</div>
        </template>
      </van-nav-bar>
      <div class="top">
        <span class="yue">我的余额</span>
        <span class="gold">{{balance | toFixPrice}}&nbsp;&nbsp;学习币</span>
      </div>
      <!-- 金币充值 -->
      <div class="content">
        <ul>
          <li
            :class="{'active':item.id ==act}"
            @click="paySelect(item)"
            v-for="(item,index) in list"
            :key="index"
          >
            <p>{{item.coin | toFixPrice}}学习币</p>
            <p class="price">￥ {{item.rmb | toFixPrice}}</p>
          </li>
        </ul>
      </div>
      <div class="instructions">
        <p class="title">充值说明</p>
        <p class="ms">{{coinInfo.agreement}}</p>
      </div>
      <van-button :class="{'actbtn':act!=0}" class="btn">立即充值</van-button>
    </div>
    <div v-else>
      <van-nav-bar @click-left="onClickLeft(1)" title="余额明细" left-arrow></van-nav-bar>
      <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"></van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, List } from "vant";
import { gold, czgold } from "../../request/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [List.name]: List
  },
  data() {
    return {
      balance: 0,
      coinInfo: {},
      list: [],
      act: 0,
      detailShow: true,
      loading: false,
      finished: true
    };
  },
  mounted() {
    document.body.style.background = "#f2f3f5";
    this.getgold();
    this.getczgold();
  },
  methods: {
    detail() {
      this.detailShow = false;
    },
    paySelect(item) {
      console.log(item);
      this.act = item.id;
    },
    getczgold() {
      czgold().then(res => {
        console.log(res);
        this.coinInfo = res.coinInfo;
        this.list = res.list;
      });
    },
    getgold() {
      gold().then(res => {
        this.balance = res.balance;
      });
    },
    onClickLeft(v) {
      if (v == 1) {
        this.detailShow = true;
        return;
      } else {
        this.$router.go(-1);
      }
    },
    onLoad() {}
  }
};
</script>

<style scoped lang="scss" >
.active {
  border: 1px red solid;
}
.content {
  width: 90%;
  margin: 0 auto;
  ul {
    li {
      height: 60px;
      background: #fff;
      margin-top: 15px;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      padding: 0 10px;
      .price {
        color: red;
        font-size: 14px;
      }
    }
  }
}

.btn {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #cccccc;
  position: fixed;
  bottom: 0;
}

.actbtn {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #eb6100;
  position: fixed;
  bottom: 0;
}
.top {
  width: 100%;
  height: 57px;
  background: #fff;
  line-height: 57px;
  font-size: 16px;
  .gold {
    padding-left: 10px;
    color: #dc692a;
  }
  .yue {
    padding-left: 15px;
  }
}
.instructions {
  width: 100%;
  background: #fff;
  margin-top: 15px;
  margin-bottom: 50px;
  .title {
    padding-top: 20px;
    padding-left: 15px;
    font-weight: 600;
    font-size: 14px;
    line-height: 1px;
  }
  .ms {
    color: #777;
    padding: 5px 15px;
  }
}
</style>
