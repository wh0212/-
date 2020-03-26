<template>
  <div class="hot_content">
    <div>
      <div class="cource" v-for="(item,index) in data.list" :key="index">
        <p class="title">{{item.title}}</p>
        <p class="cource_xq">
          <van-icon class="icon" name="clock-o" />
          <span>{{item.end_play_date | itemD}} &nbsp;|&nbsp; 共{{item.sales_num}}课时</span>
        </p>
        <div class="cource_img">
          <ul>
            <li>
              <img class="image" :src="item.teachers_list[0].teacher_avatar" alt />
              <p>{{item.teachers_list[0].teacher_name}}</p>
            </li>
          </ul>
        </div>
        <div class="cource_bottom">
          <span class="places">{{item.browse_num}}人已报名</span>
          <span class="status">{{item.price===0?"免费":item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import Tiem from "../../util/Time";
export default {
  props:["data"],
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      currentpage: 0,
      lastpage: 5,
      list: []
    };
  },
  mounted() {
    console.log(this.curseData);
    
    // coursebasis().then(res => {
    //   // console.log(res.data.data);
    //   const { current_page, list, last_page } = res.data.data;
    //   this.lastpage = last_page;
    //   this.currentpage = current_page;
    //   this.list = list;
    // });
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

    //       this.currentpage++;
    //       coursebasis({ page: this.currentpage }).then(res => {
    //         const { current_page, list, last_page } = res.data.data;
    //         this.lastpage = last_page;
    //         this.currentpage = current_page;
    //         this.list = [...this.list, ...list];
    //       });
    //     }
    //   };
    // });
  },
  methods: {},
  filters: {
    itemD(v) {
      return Tiem(v);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.cource_bottom {
  display: flex;
  justify-content: space-between;
  padding: 25px 10px;
  .places {
    color: #777;
  }
  .status {
    color: #44a426;
    font-size: 16px;
  }
}
.cource_img {
  ul {
    li {
      padding: 0 10px;
      text-align: center;
      color: #777;
      display: flex;
      align-items: center;
      .image {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }
  }
}
.cource {
  @include Wm(93%);
  background: #fff;
  height: 180px;
  margin: 15px auto;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  .title {
    font-size: 17px;
    padding: 0 10px;
    padding-top: 10px;
  }
  .cource_xq {
    color: #777;
    padding: 0 10px;
    margin-top: -10px;
    display: flex;
    align-items: center;
  }
}
</style>