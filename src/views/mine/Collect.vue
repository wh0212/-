<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的收藏" left-arrow></van-nav-bar>
    <div class="img" v-if="list.length==0">
      <img src="../../assets/images/empty.png" alt />
      <p>暂无关注</p>
    </div>
    <div v-else class="content">
      <div
        slot="item"
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="onItem(item)"
      >
        <div class="collect-icon" @click.stop="onUnstar(item)"></div>
        <div class="top">
          <p class="title">{{item.title}}</p>
          <p class="time">
            <span class="duration" v-if="$pub.showDuration(item.course_type)">
              <img class="clock" src="@/assets/images/icon-time.png" alt />
              <span>{{item.start_play_date | fomartTime('MM月dd日 hh:mm')}} ~ {{item.end_play_date | fomartTime('MM月dd日 hh:mm')}}</span>
            </span>
            <span>共{{item.section_num}}课时</span>
          </p>
          <ul class="teachers">
            <li :key="index">
              <img :src="item.teachersAvatar" />
              <span>{{item.teachers}}</span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <div class="info">
            <p class="sign">{{item.sales_num}}人已报名</p>
            <div class="price">
              <p class="price-line" v-if="item.underlined_price">
                <!-- <img class="price-ico" :src="$store.state.config.price_ico" /> -->
                {{item.underlined_price | toFixPrice}}
              </p>
              <p class="price-now">
                <!-- <img class="price-ico" :src="$store.state.config.price_ico" /> -->
                <i class="iconfont icon-jinbi"></i>
                {{item.price | toFixPrice}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, List, Toast } from "vant";
import { collectlist, nocollect } from "../../request/http";
export default {
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: true
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Toast.name]: Toast
  },
  mounted() {
    document.body.style.background = "#f2f3f5";
    this.getcollect();
  },
  methods: {
    onItem(v) {
      console.log(v);
      this.$router.push({
        path: "/coursedet",
        query: {
          id: v.course_id
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onUnstar(item) {
      console.log(item);
      nocollect(item.collect_id).then(() => {
        this.$toast({
          message: "取消收藏成功",
          position: "bottom",
          duration: 1500
        });
      });
      this.getcollect();
    },
    getcollect() {
      //page=1&limit=10&type=1
      collectlist({ page: 1, limit: 10, type: 1 }).then(res => {
        console.log(res);
        this.list = res.list;
        console.log(this.list);
      });
    }
  }
};
</script>

<style scoped lang="scss" >
.img {
  text-align: center;
}
.content {
  padding: 15px 10px;
}
.item {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  position: relative;
  .collect-icon {
    background: url("~@/assets/theme-img/icon-star.png") no-repeat center;
    background-size: 18px 18px;
    width: 25px;
    height: 25px;
    float: right;
  }
  .top {
    .title {
      font-size: 17px;
      font-weight: 500;
      color: #000;
      margin-top: 0px;
    }
    .time {
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 20px;

      .duration {
        margin-right: 20px;
        position: relative;
        * {
          vertical-align: middle;
        }
        .clock {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 20px;
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          background-color: #999;
        }
      }
    }
    .teachers {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      li {
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.45);
          vertical-align: middle;
          margin-left: 15px;
          display: inline-block;
          width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .bottom {
    border-top: 1px solid #f5f5f5;
    margin-top: 0px;
    padding-top: 10px;
    .info {
      .sign {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        text-align: left;
      }
      .price {
        float: right;
        .price-line {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.45);
          text-decoration: line-through;
          display: inline-block;
        }
        .price-now {
          font-size: 15px;
          color: #ee1f1f;
          display: inline-block;
          &::first-letter {
            font-size: 14px;
          }
          .iconfont {
            color: orange;
          }
        }
      }
    }
  }
}
</style>
