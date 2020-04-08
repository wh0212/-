
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
          v-show="item.id!=2"
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
            <input type="file" accept="image/*" @change="onChangeAvatar" />
          </li>
          <li @click="onShowProp(2)">
            从手机相册选择
            <input type="file" accept="image/*" @change="onChangeAvatar" />
          </li>
          <li @click="showPopup = false">取消</li>
        </ul>
        <van-datetime-picker
          v-else-if="changeTag == 'birthday'"
          v-model="birthday.currentDate"
          type="date"
          :min-date="birthday.minDate"
          :max-date="birthday.maxDate"
          @cancel="onCancel"
          @confirm="onConfirmBirthday"
        />
        <van-area
          v-else-if="changeTag == 'address'"
          :area-list="areaList"
          :columns-num="3"
          @change="onChangeAddress"
          @cancel="onCancel"
          @confirm="onConfirmAddress"
          :value="userInfo.district_id + ''"
        />
        <van-picker
          v-if="changeTag == 'attrs'"
          :columns="attrsColums"
          :default-index="attrsSelectIdx"
          show-toolbar
          @cancel="onCancel"
          @confirm="onConfirmAttrs"
        />
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
import { Userinfo, attr, user, avatar, city } from "@/request/http";
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
    onCancel() {
      this.showPopup = false;
    },
    onConfirmAttrs(value, index) {
      this.showPopup = false;
      this.attrs[value.parentIdx].selectIdx = index;
      const attrAry = [];
      this.attrs.forEach(i => {
        if (i.selectIdx == -1) return;
        attrAry.push({
          attr_id: i.id,
          attr_val_id: i.value[i.selectIdx].id
        });
      });
      // console.log(JSON.stringify(attrAry));
      this.requestUpdateUserInfo({
        user_attr: JSON.stringify(attrAry)
      });
    },
    onChangeAddress(picker, data, index) {
      // console.log(picker, data, index);
      switch (index) {
        case 0:
          city(data[index].code).then(res => {
            let obj = {};
            res.forEach(i => {
              obj[i.id] = i.area_name;
            });
            this.areaList.city_list = obj;
            city(res[0].id).then(res1 => {
              obj = {};
              res1.forEach(i => {
                obj[i.id] = i.area_name;
              });
              this.areaList.county_list = obj;
            });
          });
          break;
        case 1:
          city(data[index].code).then(res => {
            let obj = {};
            res.forEach(i => {
              obj[i.id] = i.area_name;
            });
            this.areaList.county_list = obj;
          });
          break;
        case 2:
          break;
      }
    },
    onConfirmAddress(val) {
      this.showPopup = false;
      this.requestUpdateUserInfo({
        province_id: val[0].code,
        city_id: val[1].code,
        district_id: val[2].code
      });
    },
    onConfirmBirthday(v) {
      let youWant =
        v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate();
      // console.log(youWant);
      this.requestUpdateUserInfo({ birthday: youWant });
    },
    onChangeAvatar(e) {
      console.log(e.target.files[0]);
      const formdata = new FormData();
      formdata.append("file", e.target.files[0]); //在数据末尾追加数据append(key,value)
      console.log(formdata.get('file'));

      avatar(formdata).then(res => {
        console.log(res);
        this.requestUpdateUserInfo({ avatar: res.path });
        this.showPopup = false;
      });
    },
    onShowProp(v, d) {
      // console.log(v, d);
      switch (v) {
        case "nickname":
          this.$router.push({
            path: "/setinfo",
            query: {
              tag: v,
              value: this.userInfo.nickname
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
              tag: v,
              value: this.userInfo.sex
            }
          });
          break;
        case "birthday":
          this.showPopup = true;
          this.changeTag = v;
          break;
        case "address":
          this.showPopup = true;
          this.changeTag = v;
          break;
        case "attrs":
          this.showPopup = true;
          this.changeTag = v;
          this.attrsColums = d.value;
          this.attrsSelectIdx = d.selectIdx;
          break;
        case "subjects":
          var val;
          this.attrs.forEach(res => {
            if (res.id == 2) {
              val = res.value;
            }
          });
          console.log(val);
          this.$router.push({
            path: "/setinfo",
            query: {
              tag: v,
              value: val,
              select: this.userInfo.subjects
            }
          });
          break;
        default:
          break;
      }
    },
    requestcity() {
      city(0).then(res => {
        // console.log(res);
        let obj = {};
        res.forEach(i => {
          obj[i.id] = i.area_name;
        });
        //省
        this.areaList.province_list = obj;
        const provinceID = this.userInfo.province_id || res[0].id;
        city(provinceID).then(res1 => {
          // console.log(res1);
          obj = {};
          res1.forEach(i => {
            obj[i.id] = i.area_name;
          });
          this.areaList.city_list = obj;
          const cityID = this.userInfo.city_id || res1[0].id;
          city(cityID).then(res2 => {
            // console.log(res2);
            obj = {};
            res2.forEach(i => {
              obj[i.id] = i.area_name;
            });
            this.areaList.county_list = obj;
            if (!this.userInfo.district_id && res2.length) {
              this.userInfo.district_id = res2[0].id;
            }
          });
        });
      });
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
      Userinfo().then(data => {
        console.log(data);

        this.userInfo = data;
        // 生日
        if (this.userInfo.birthday == 0) {
          this.userInfo.birthday = "请选择";
        }
        // 城市
        if (!this.userInfo.province_name) {
          this.userInfo.province_name = "请选择";
        }
        //学科
        let subArr = [];
        let subNames = "";
        data.attr.forEach(res => {
          if (res.attr_id == 2) {
            subArr.push(res.attr_val_id);
            subNames = subNames + " " + res.attr_value;
          }
        });
        this.userInfo.subjects = subArr;
        this.userInfo.subjectNames = subNames;

        // 动态属性
        this.attrs = [];
        attr().then(attrData => {
          attrData.forEach(i => {
            if (i.value.length == 0) return;
            // 修改
            i.value.forEach(ci => {
              ci.text = ci.name;
              ci.parentIdx = this.attrs.length;
            });
            // 选中
            i.selectIdx = -1;
            for (const attri of this.userInfo.attr) {
              if (attri.attr_id == i.id) {
                for (let vali = 0; vali < i.value.length; ++vali) {
                  console.log(i.value[vali]);
                  if (attri.attr_val_id == i.value[vali].id) {
                    i.selectIdx = vali;
                    break;
                  }
                }
                break;
              }
            }
            this.attrs.push(i);
          });
        });
        this.showPopup = false;
      });
    }
  },
  mounted() {
    this.requestUserInfo();
    this.requestcity();
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
.subject {
  input {
    width: 50px;
    height: 50px;
    margin-top: 30px;
    margin-right: 20px;
    float: left;
  }
  span {
    display: inline-block;
    height: 110px;
    line-height: 110px;
  }
}
</style>