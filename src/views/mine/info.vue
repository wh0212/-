<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="个人信息" left-arrow></van-nav-bar>
    <div class="info_content">
      <ul>
        <li @click="onShowProp('avatar')">
          <span>头像</span>
          <span>
            <img :src="userInfo.avatar" alt />
          </span>
        </li>
        <li @click="onShowProp('nickname')">
          <span>昵称</span>
          <span>{{userInfo.nickname}}</span>
        </li>
        <li class="mobile">
          <span>手机号</span>
          <span>{{userInfo.mobile}}</span>
        </li>
        <li @click="onShowProp('sex')">
          <span>性别</span>
          <span>{{userInfo.sex | sexD}}</span>
        </li>
        <li @click="onShowProp('birthday')">
          <span>出生日期</span>
          <span>{{userInfo.birthday}}</span>
        </li>
        <li @click="onShowProp('address')">
          <span>所在城市</span>
          <span>{{userInfo.province_name}}{{userInfo.city_name?"，"+userInfo.city_name:''}}{{userInfo.district_name?"，"+userInfo.district_name:''}}</span>
        </li>
        <li @click="onShowProp('subjects')">
          <span>学科</span>
          <span>{{userInfo.subjectNames}}</span>
        </li>
        <!-- 年级 -->
        <li
          v-for="(item, index) in attrs"
          v-if="item.id!=2"
          :key="index"
          @click="onShowProp('attrs', item)"
        >
          <span>{{item.attr}}</span>
          <span>{{item.selectIdx == -1 ? '请选择' : item.value[item.selectIdx].text}}</span>
        </li>
      </ul>
      <!-- 弹出层 -->
      <van-popup v-model="showPopup" position="bottom">
        <ul v-if="changeTag == 'avatar'" class="popup">
          <li @click="onShowProp(1)">
            拍照
            <input type="file" accept="image/*" capture="camera" @change="onChangeAvatar" />
          </li>
          <li @click="onShowProp(2)">
            从手机相册选择
            <input type="file" accept="image/*" @change="onChangeAvatar" />
          </li>
          <li @click="showPopup = false">取消</li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
// import city from "@/util/city";
import {
  NavBar,
  Icon,
  Cell,
  ActionSheet,
  Area,
  Picker,
  DatetimePicker,
  Popup
} from "vant";
import { Userinfo, attr, user, avatar } from "@/request/http";
export default {
  data() {
    return {
      userInfo: {},
      showPopup: false,
      changeTag: "",
      birthday: {
        minDate: new Date(1700, 1, 1),
        maxDate: new Date(),
        currentDate: new Date()
      },
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      attrs: [],
      attrsColums: [],
      attrsSelectIdx: -1
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]: ActionSheet,
    [Area.name]: Area,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  methods: {
    onChangeAvatar(e) {
      console.log(e.target.files[0]);
      const formdata = new FormData();
      formdata.append("file", e.target.files[0]);
      avatar(formdata).then(res => {
        console.log(res);
        this.requestUpdateUserInfo({ avatar: res.path });
        this.showPopup = false;
      });
    },
    onShowProp(v, d) {
      console.log(v, d);
      switch (v) {
        case "nickname":
          this.$router.push({
            path: "/setinfo",
            query: {
              value: v,
              data: this.userInfo.nickname
            }
          });
          break;
        case "avatar":
          this.showPopup = true;
          this.changeTag = v;
          break;
        case "sex":
          this.$router.push({
            path: "/setinfo",
            query: {
              value: v,
              name: this.userInfo.sex
            }
          });
          break;
        default:
          break;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    requestUpdateUserInfo(params) {
      user(params).then(() => {
        this.$toast("数据更新成功");
        this.requestUserInfo();
      });
    },
    requestUserInfo() {
      Userinfo().then(res => {
        console.log(res);
        this.userInfo = res;
      });
      attr().then(res => {
        // console.log(res);
        res.forEach(i => {
          if (i.value.length == 0) return;

          i.value.forEach(ci => {
            ci.text = ci.name;
            ci.parentIdx = this.attrs.length;
          });

          i.selectIdx = -1;
          for (const attri of this.userInfo.attr) {
            if (attri.attr_id == i.id) {
              for (let vali = 0; vali < i.value.length; ++vali) {
                // console.log(i.value[vali]);
                if (attri.attr_val_id == i.value[vali].id) {
                  i.selectIdx = vali;
                  break;
                }
              }
              break;
            }
          }
          // console.log(i);

          this.attrs.push(i);
        });
      });
    }
  },
  mounted() {
    this.requestUserInfo();
  },
  filters: {
    sexD(v) {
      if (v == 0) {
        return "男";
      } else if (v == 1) {
        return "女";
      } else {
        return "保密";
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.info_content {
  margin-top: 15px;
  .avatar {
    width: 30px;
    height: 30px;
  }
  ul {
    background: #fff;
    margin: 20px 0;
    padding: 0px 30px;
    li {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      position: relative;
      border-bottom: 1px #eee solid;
      span:nth-child(1) {
        font-size: 15px;
        color: #595959;
      }
      span:nth-child(2) {
        font-size: 15px;
        color: #8c8c8c;
        margin-right: 20px;
      }
      span > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 10px;
        height: 10px;
        border-top: 1px solid #b7b7b7;
        border-right: 1px solid #b7b7b7;
      }
      &:last-child:after {
        display: none;
      }
    }
    .mobile:before {
      display: none;
    }
  }
  .popup {
    margin: 0;
    li {
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      font-weight: 300;
      color: #030303;
      text-align: center;
      display: block;
      // position: relative;
      &:before {
        display: none;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
}
</style>