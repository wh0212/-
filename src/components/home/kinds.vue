<template>
  <div class="kinds">
    <ul>
      <li v-for="(item,index) in kindsList" :key="index" class="kinds_item">
        <i :class="[item.kindsIcon,icon]"></i>
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "iconfont",
      kindsList: [
        {
          kindsIcon: "icon-shuben",
          title: "特色课"
        },
        {
          kindsIcon: "icon-tucao2",
          title: "一对一辅导"
        },
        {
          kindsIcon: "icon-xuexirili",
          title: "学习日历"
        }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.kinds {
  width: 90%;
  height: 3rem;
  margin: 0 auto;
  position: relative;
  top: -0.7rem;
  margin-bottom: -.7rem;
  ul {
    @include FlexSpace();
  }
}
.kinds_item {
  width: 2.8rem;
  height: 2.8rem;
  @include BgC(#fff, #8c8c8c);
  border-radius: 10px;
  text-align: center;
  @include FlexMenu();
  .iconfont {
    font-size: 0.65rem;
  }
  .icon-shuben {
    color: #5251da;
  }
  .icon-tucao2 {
    color: #73b3a5;
  }
  .icon-xuexirili {
    color: #d88f72;
  }
}
</style>