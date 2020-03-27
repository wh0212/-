<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="学习日历" left-arrow>
      <template #right>
        <van-icon color="#000" size="20" name="search" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
export default {
    data() {
        return {
            
        }
    },
    components:{
        [NavBar.name]:NavBar,
        [Icon.name]:Icon
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        }
    }
};
</script>


<style lang="scss" scoped>
</style>