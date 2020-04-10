<template>
  <div>
    <div v-show="show ==0">
      <van-nav-bar title="题库选择" @click-left="onClickLeft" left-arrow />
      <div class="search">
        <van-cell-group class="inp">
          <van-field
            @click-right-icon="onright"
            class="input"
            right-icon="search"
            v-model="value"
            placeholder="请输入题库名称关键字"
            @keyup.enter.native="onSearch"
          />
        </van-cell-group>
      </div>
      <div class="content">
        <div class="content_left">
          <ul>
            <li
              :class="act==item.id?'active':''"
              v-for="(item,index) in pointList"
              :key="index"
              @click="onpointL(item)"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="content_right">
          <div v-for="(item,index) in pointRist" :key="index" class="right_item">
            <p>{{item.name}}</p>
            <ul class="item">
              <li
                @click="pointRact=item2.id"
                :class="pointRact==item2.id?'active2':''"
                v-for="(item2) in item.bank"
                :key="item2.id"
                class="item_xq"
              >{{item2.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-show="show==1" class="point_Search">
      <div class="search">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
      <div class="sear_content">
        <ul>
          <li v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, CellGroup, Field, Search, Toast } from "vant";
import { pointL, pointR, pointSearch } from "../../request/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Search.name]: Search,
    [Toast.name]: Toast
  },
  data() {
    return {
      value: "",
      pointList: [],
      pointRist: [],
      searchList: [],
      act: 19,
      show: 0,
      pointRact: 0
    };
  },
  mounted() {
    document.body.style.background = "#fff";
    this.initpointL();
    this.initpintR();
  },
  methods: {
    //enter
    onSearch() {
      if (!this.value) {
        this.$toast({
          message: "不能为空"
        });
        return;
      }
      this.show = 1;
      this.Search(this.value);
    },
    onCancel() {
      this.show = 0;
      this.value = "";
    },
    //点击搜素
    onright() {
      if (!this.value) {
        this.$toast({
          message: "不能为空"
        });
        return;
      }
      this.show = 1;
      this.Search(this.value);
    },
    Search(v) {
      pointSearch(v).then(res => {
        this.searchList = res;
      });
    },
    onpointL(item) {
      this.act = item.id;
      this.initpintR();
    },
    initpointL() {
      pointL().then(res => {
        this.act = res[0].id;
        this.pointList = res;
      });
    },
    initpintR() {
      pointR(this.act).then(res => {
        console.log(res);
        this.pointRist = res;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.sear_content {
  ul {
    li {
      line-height: 40px;
      padding-left: 10px;
      border-bottom: 1px #e6e4e4 solid;
      color: #595959;
    }
  }
}
.content {
  display: flex;
  border-top: 1px rgb(245, 245, 245) solid;
  .content_left {
    width: 25%;
    position: absolute;
    left: 0;
    background: #f2f3f5;
    height: 100%;
    ul {
      li {
        padding-left: 10px;
        line-height: 40px;
      }
      .active {
        background: #fff;
      }
    }
  }
  .content_right {
    width: 75%;
    position: absolute;
    right: 0;
    background: #fff;
    height: 100%;
    .right_item {
      padding-left: 10px;
      .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-left: 10px;
        li {
          padding: 4px 20px;
          width: 70px;
          background: #f2f3f5;
          margin: 5px 5px;
          border-radius: 2px;
          text-align: center;
        }
        .active2 {
          background: #fdefe5;
          color: #eb6100;
        }
      }
    }
  }
}
.search {
  width: 100%;
  background: #fff;
  padding: 5px 0px;
}
.inp {
  width: 95%;
  margin: 6px auto;
  border-radius: 55px;
  background: #f7f8fa;
  .input {
    border-radius: 45px;
    background: #f7f8fa;
  }
}
</style>
