<template>
  <div class="hander">
    <div class="top">
      <div class="hand">
        特色课
        <van-icon @click="search" class="icon" name="search" />
      </div>
      <div>
        <HandMenu @reset="resetfun" @attr="attrId" @course="courseda" @sreen="sreenda" />
      </div>
    </div>
    <van-list
      finished-text="没有更多了"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      class="content"
    >
      <Courseitem :data="curseData.list" />
    </van-list>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { Icon, List } from "vant";
import Courseitem from "../components/course/course_item";
import HandMenu from "../components/course/handMenu";
import { coursebasis } from "../request/http";
export default {
  components: {
    [Icon.name]: Icon,
    [List.name]: List,
    Courseitem,
    HandMenu
  },
  data() {
    return {
      loading: false,
      finished: true,
      curseData: {},
      params: {
        page: 1,
        order_by: 0,
        course_type: 0,
        classify_id: null
      }
    };
  },
  mounted() {
    coursebasis().then(res => {
      this.curseData = res.data.data;
      this.finished = false;
    });
    // this.$nextTick(() => {
    //   var bady = document.body;
    //   // 获取滚动条的dom
    //   bady.onscroll = () => {
    //     var scrollTop =
    //       document.documentElement.scrollTop || document.body.scrollTop;

    //     var windowHeight =
    //       document.documentElement.clientHeight || document.body.clientHeight;

    //     var scrollHeight =
    //       document.documentElement.scrollHeight || document.body.scrollHeight;

    //     //  console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
    //     if (scrollTop + windowHeight >= scrollHeight - 10) {
    //       // 把距离顶部的距离加上可视区域的高度 等于或者大于滚动条的总高度就是到达底部
    //       console.log("触发了");
    //       this.params.page++;
    //       coursebasis(this.params).then(res => {
    //         const { current_page, list, last_page } = res.data.data;
    //         this.curseData.last_page = last_page;
    //         this.curseData.current_page = current_page;
    //         this.curseData.list = [...this.curseData.list, ...list];
    //       });
    //     }
    //   };
    // });
  },
  methods: {
    onLoad() {
      this.params.page++;
      coursebasis(this.params).then(res => {
        this.loading = false;
        const { current_page, list, last_page } = res.data.data;
        if (list.length == 0 && this.page != 1) {
          this.finished = true;
          this.onFinished && this.onFinished();
          return;
        }
        this.curseData.last_page = last_page;
        this.curseData.current_page = current_page;
        this.curseData.list = [...this.curseData.list, ...list];
      });
      // this.finished= true
    },
    search() {
      this.$router.push("/search");
    },
    resetfun() {
      this.beg();
    },
    courseda(v) {
      this.params.order_by = v;
      this.beg(this.params);
    },
    sreenda(v) {
      this.params.course_type = v;
      this.beg(this.params);
    },
    beg(v) {
      coursebasis(v).then(res => {
        this.curseData.list = res.data.data.list;
        this.curseData.current_page = res.data.data.current_page;
      });
    },
    attrId(v) {
      this.params.attr_val_id = v;
      this.beg(this.params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/index.scss";
.bottom {
  height: 40px;
}
.icon {
  float: right;
  line-height: 1rem;
  font-weight: 600;
  padding-right: 10px;
}
.hand {
  @include Wm(100%);
  line-height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  background: #fff;
}
</style>