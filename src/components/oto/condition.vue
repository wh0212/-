<template>
  <div>
    <div class="about">
      <p class="title">老师类型</p>
      <ul>
        <li
          @click="choose(index,item)"
          v-for="(item,index) in obj.otoTeacherLevel"
          :key="index"
        >{{item.level_name}}</li>
      </ul>
    </div>
    <div class="options" v-for="(item,index) in obj.attrList" :key="index">
      <p class="title">{{item.attr_name}}</p>
      <ul>
        <li v-for="(item2,index) in item.child" :key="index">{{item2.attr_val_name}}</li>
      </ul>
    </div>
    <div class="botom">
      <div class="reset">重置</div>
      <div @click="off" class="fix">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["obj"],
  data() {
    return {};
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  methods: {
    choose(index, item) {
      console.log(item);
    },
    off() {
      this.$emit("off");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.botom{
    width: 100%;
    height: 45px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    .fix{
        background: #EB6100;
        color: #FFF;
    }
    .reset{
        color: #EB6100;
        background: #FFF;
    }
    div{
        flex: 1;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
    }
}
.active {
  background: #ebeefe !important;
  color: #eb6100 !important;
}
.options {
  @include Wm(95%);
  .title {
    padding-left: 10px;
  }
  ul {
    display: flex;
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
.about {
  @include Wm(95%);
  .title {
    padding-left: 10px;
  }
  ul {
    display: flex;
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
</style>