<template>
  <div>
    <div @click="onClick(item)" v-for="(item,index) in courseList" :key="index" class="listItem">
      <div class="Itemtop">
        <p class="title">{{item.course_title}}</p>
        <p :class="{playing:item.live_status==1}">[{{item.is_play_back ? "回放" : "暂无回放"}}]</p>
        <p>{{item.live_time}}</p>
      </div>
      <div class="ItemBom">
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoom, getRoomCode } from "../../request/http";
export default {
  props: {
    courseList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    onClick(item) {
      console.log(item);
      if (item.course_type == 1) {
        getRoom(item.course_basis_id).then(data => {
          window.location.href = data.web_url;
        });
      } else {
        const chapterID = item.course_chapter_id || 0;
        getRoomCode(item.course_basis_id, chapterID).then(data => {
          window.location.href = data.chapterInfo.web_url;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../../assets/CSS/index.scss";

.ItemBom {
  padding-left: 15px;
}
.Itemtop {
  display: flex;
  align-items: center;
  padding-left: 10px;
  p {
    margin: 13px 4px;
    padding: 0px 5px;
  }
  .title {
    background: #eb6100;
    color: #fff;
  }
  .playing {
    color: $theme_color;
  }
}
.listItem {
  width: 95%;
  height: 80px;
  border-radius: 5px;
  margin: 7px auto;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
}
</style>
