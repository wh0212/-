<template>
  <div>
    <div class="examitem" v-for="(item,index) in data" :key="index">
      <p class="title">
        <span>《{{item.exam_type == 2 ? '正式考试':'模拟考试'}}》</span>
        <span>{{item.name}}</span>
      </p>
      <div class="pc-info">
        <div>
          <span>共{{item.question_num}}道题</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    comType: {
      type: String,
      default: "Package"
    }
  },
  data() {
    return {};
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  methods: {}
};
</script>

<style lang="scss" scoped >
.examitem {
  width: 100%;
  height: 185px;
  margin-bottom: 10px;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
  p{
      line-height: 0px;
  }
  .title {
    padding-left: 15px;
    padding-top: 25px;
    font-size: 14.5px;
  }
  .pc-info {
    padding: 5px 15px;
  }
}
</style>
