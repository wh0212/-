<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的关注" left-arrow></van-nav-bar>
    <div class="img" v-if="list.length==0">
      <img src="../../assets/images/empty.png" alt />
      <p>暂无关注</p>
    </div>
    <div class="content" v-else>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in list" :key="index" class="content_item">
          <img class="avact" :src="item.avatar" alt srcset />
          <div class="xq">
            <P class="title">
              {{item.teacher_name}}
              <span class="title_ms">{{item.level_name}}</span>
            </P>
            <P class="phone">{{item.introduction}}</P>
          </div>
          <div class="fouc" @click="nofouc(item)">取消关注</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { NavBar, List, Toast } from "vant";
import { teacherList, noteacher } from "../../request/http";
export default {
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: true,
      params: {
        page: 1,
        limit: 10,
        type: 2
      }
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Toast.name]: Toast
  },
  mounted() {
    document.body.style.background = "#f2f3f5";
    this.getteacher();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getteacher() {
      teacherList(this.params).then(res => {
        console.log(res);
        this.list = res.list;
      });
    },
    onLoad() {},
    nofouc(item) {
      noteacher(item.collect_id).then(res => {
        console.log(res);
        this.$toast({
          message: res == 1 ? "已取消" : "失败",
          type: "success",
          duration: 1000
        });
        this.getteacher();
      });
    }
  }
};
</script>

<style scoped lang="scss" >
.content {
  // border: 1px red solid;
  margin: 15px 10px;
  .content_item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    .avact {
      width: 40px;
      height: 40px;
    }
    .xq {
      margin-left: 15px;
      line-height: 15px;
      flex: 3;
      .title {
        font-size: 15px;
        .title_ms {
          font-size: 12px;
          color: #ea7a2f;
        }
      }
      .phone {
        color: #777;
      }
    }
    .fouc {
      padding: 5px 10px;
      background: #fdefe5;
      color: #eb6100;
      border-radius: 10px;
    }
  }
}
.img {
  text-align: center;
}
</style>
