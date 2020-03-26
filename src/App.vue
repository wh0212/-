<template>
  <div id="app">
    <router-view />
    <div
      v-show="$store.active"
      class="Customer"
      id="default_drag_comp"
      @click="goNext"
      @touchstart="down"
      @touchmove="move"
      @touchend="end"
      
    >
      <i class="iconfont icon-xin"></i>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";


export default {
  mounted() {
    document.body.style.background = "#f2f3f5";
    this.maxW =document.body.clientWidth;
    this.maxH= document.documentElement.clientHeight
    
  },
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      maxW:0,
      maxH:0
    };
  },
  methods: {
    goNext() {
    this.$router.push("/custmoer")
      // this.$emit("goNext");
    },
    // 实现移动端拖拽
    down() {
      // let default_drag_comp = document.getElementById("#default_drag_comp");
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      // this.maxW = document.body.clientWidth - default_drag_comp.offsetWidth;
      // this.maxH = document.body.clientHeight - default_drag_comp.offsetHeight;
  
      // this.position.x = touch.clientX - default_drag_comp.offsetLeft;
      // this.position.y = touch.clientY - default_drag_comp.offsetTop;
      this.dx = touch.clientX;
      this.dy = touch.clientY;
    },
    move(event) {
      event.preventDefault();
      let default_drag_comp = document.querySelector("#default_drag_comp");
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;

        if (this.nx < 0) {
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          this.nx = this.maxW;
        }

        if (this.ny < 0) {
          this.ny = 0;
        } else if (this.ny >= this.maxH) {
          this.ny = this.maxH;
          // console.log(this.maxH,this.maxW);
          
        }
        default_drag_comp.style.left = this.nx-30 + "px";
        default_drag_comp.style.top = this.ny-30 + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function() {
            // event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    }
  }
};
</script>


<style >
@import "./styles/iconfont.wxss";
.iconfont {
  font-size: 30px;
}
.Customer {
  background: #007aff;
  border-radius: 100%;
  text-align: center;
  line-height: 60px;
  color: #fff;
  position: fixed;
  bottom: 80px;
  right: 10px;
  width: 60px;
  height: 60px;
  z-index: 99999999;
}
</style>
