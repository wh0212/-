<template>
  <div class="card">
    <p class="title">{{title}}</p>
    <div>
      <van-cell class="cell" v-for="(item,index) in cartList" :key="index">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="card_item">
            <div class="img">
              <img :src="item.image" alt />
            </div>
            <div class="item-right">
              <p>{{item.name}}</p>
              <p class="item_xq">{{item.details}}</p>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  props:["title"],
  data() {
    return {
      cartList: [
        {
          image:
            "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019X3gWvILU7J1571983543.png",
          name: "杨胜德",
          details: "杨老师，特级教师多次被选为中国数学会品味全国高校模范老师"
        },
        {
          image:
            "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019wX5ZNRNxBT1577773182.jpg",
          name: "文卫星",
          details:
            "文卫星，江苏沐阳县人，上海特级教师多次被选为中国数学会品味全国高校模范老师"
        },
        {
          image:
            "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20192TSKKmyNso1572684453.png",
          name: "马学斌",
          details:
            "马学斌，从2004年起特级教师多次被选为中国数学会品味全国高校模范老师"
        }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.cell {
  margin-bottom: 0.2rem;
}
.card {
  width: 95%;
  margin: 0 auto;
  //   margin-top: -0.6rem;
  .title {
    border-left: 3px red solid;
    padding-left: 0.3rem;
    font-size: 0.42rem;
  }
}
.card_item {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
  .item-right {
    margin-left: 0.3rem;
    p {
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .item_xq {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>