<template>
  <div>
    <div class="top">
      <van-nav-bar @click-left="onClickLeft" title="课程详情" left-arrow>
        <template #right>
          <van-icon color="#000" size="20" name="search" />
        </template>
      </van-nav-bar>
    </div>
    <div>
      <div class="info">
        <p class="title">
          <span>{{data.info.title}}</span>
          <span>
            <van-icon class="icon" name="star-o" />
          </span>
        </p>
        <p class="price">
          <i class="iconfont icon-jinbi"></i>
          {{data.info.price}}
        </p>
        <p class="info_xq">
          <span>共{{data.info.total_periods}}课时 | {{data.info.sales_num}}人报名</span>
        </p>
        <p class="info_xq">开课时间：{{data.info.end_play_date | itemD}}</p>
      </div>
      <div class="actives">
        <p>活动:</p>
        <div class="vip">优惠</div>
        <p>
          领取优惠券最多可减 &nbsp;
          <i class="iconfont icon-jinbi"></i>&nbsp;10
        </p>
        <p class="reveive">领取></p>
      </div>
      <div class="teach">
        <p class="title">教学团队</p>
        <div class="team_item">
          <ul>
            <li v-for="(item,index) in data.teachers" :key="index">
              <div class="avatar">
                <img class="image" :src="item.avatar" alt />
              </div>
              <div class="txt">{{item.teacher_name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import Tiem from "../../util/Time";
export default {
  name: "swiperid",
  data() {
    return {
      data: {
        info: {
          title: ""
        }
      }
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  mounted() {
    // console.log(this.$route.query.id);
    this.$http.get(`/courseInfo/basis_id=${this.$route.query.id}`).then(res => {
      console.log(res);
      this.data = res;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  filters: {
    itemD(v) {
      return Tiem(v);
    }
  }
};
</script>


<style lang="scss" scoped>
.teach {
  width: 100%;
  height: 145px;
  background: #fff;
  margin-top: 15px;
  .title {
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
  }
  .team_item {
    padding-left: 10px;
    overflow: hidden;
    ul {
      display: flex;
      align-items: center;
      li {
        width: 70px;
        float: left;
        margin-right: 10px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin: 0 auto;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
        .txt {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .image {
      width: 100%;
      border-radius: 100%;
    }
  }
}
.icon-jinbi {
  color: #e9bf17;
  font-size: 13px;
}
.actives {
  width: 100%;
  height: 56px;
  background: #fff;
  margin-top: 15px;
  display: flex;
  align-items: center;
  .vip {
    width: 38px;
    height: 19px;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    background-image: url("../../assets/images/bg-vip-board.png");
    background-size: 100% 100%;
  }
  .reveive {
    margin-left: 70px;
  }
  p {
    padding-left: 10px;
    margin-right: 10px;
  }
}
.info {
  width: 100%;
  height: 146px;
  background: #fff;
  margin-top: 46px;
  .title {
    font-size: 16px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      padding-right: 10px;
    }
  }
  .price {
    color: #ee1f1f;
    font-size: 16px;
  }
  .info_xq {
    color: #777;
  }
  p {
    padding-left: 10px;
    line-height: 15px;
  }
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>