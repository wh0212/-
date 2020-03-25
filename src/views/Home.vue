<template>
  <div class="home">
    <router-view />
    
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar";

export default {
  name: "Home",
  components: {
    Tabbar
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>


</style>
