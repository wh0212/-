<template>
  <div class="hander">
    <div class="top">
      <div class="hand">
        特色课
        <van-icon class="icon" name="search" />
      </div>
      <div>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" title="分类">
            <div class="about">
              <div>
                <p>{{list.name}}</p>
                <ul>
                  <li
                    @click="choose(index)"
                    :class="{'active':index===act}"
                    v-for="(item,index) in list.child"
                    :key="index"
                  >{{item.name}}</li>
                </ul>
              </div>
              <div>
                <p>{{list2.name}}</p>
                <ul>
                  <li
                    @click="choose2(index)"
                    :class="{'active':index===act2}"
                    v-for="(item,index) in list2.child"
                    :key="index"
                  >{{item.name}}</li>
                </ul>
              </div>
            </div>
            <van-divider />
            <div class="btn">
              <van-button plain size="small" class="btn_item" block type="info">重置</van-button>
              <van-button color="#eb6100" size="small" class="btn_item" block type="info">确认</van-button>
            </div>
          </van-dropdown-item>
          <van-dropdown-item v-model="value2" title="排序" />
          <van-dropdown-item title="筛选" ref="item">22</van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <div class="content">
      <!-- <div class="main"> -->
        <Courseitem />
      <!-- </div> -->
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
import { Icon, DropdownMenu, DropdownItem, Button, Divider } from "vant";
import { courseify } from "../request/http";
import Courseitem from "../components/course/course_item";
export default {
  components: {
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    [Divider.name]: Divider,
    Courseitem
  },
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: 0,
      list: {},
      list2: {},
      act: null,
      act2: null
    };
  },
  mounted() {
    courseify().then(res => {
      // console.log(res.data.data);
      const { attrclassify } = res.data.data;
      (this.list = attrclassify[0]), console.log(this.list);

      this.list2 = attrclassify[1];
    });
    // var scroll = new BScroll(".content", {
    //   scrollX: false,
    //   scrollY: true
    // });
    // scroll.on("scroll", pos => {
    //   console.log(pos.y);
    // });
  },
  methods: {
    ok() {
      console.log(this.value2);
    },
    choose(index) {
      console.log(index);
      this.act = index;
    },
    choose2(index) {
      console.log(index);
      this.act2 = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/CSS/index.scss";
.content {
  margin-top: 100px;
  // height: 520px;
  // overflow: hidden;

}

.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11111;
}
.bottom {
  height: 50px;
}
.active {
  background: #ebeefe !important;
  color: #eb6100 !important;
}
.about {
  @include Wm(95%);
  ul {
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 2rem;
      height: 0.8rem;
      @include BgC(#f5f5f5, #646464);
      text-align: center;
      line-height: 0.7rem;
      border-radius: 3px;
      margin: 7px;
    }
  }
}
.btn_item {
  width: 40%;
  color: #000;
}
.btn {
  @include Wm(95%);
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
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