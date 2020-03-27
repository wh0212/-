<template>
  <div>
    <van-calendar :poppable="false" :show-confirm="false" :style="{ height: '500px' }" />
    <div class="botom">
        <div class="reset">重置</div>
        <div @click="off" class="fix">
            确定
        </div>
    </div>
  </div>
</template>

<script>
import { Calendar, Cell } from "vant";

export default {
  data() {
    return {
      date: ""
    };
  },
  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.date = this.formatDate(date);
    },
    off(){
        this.$emit("off")
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>