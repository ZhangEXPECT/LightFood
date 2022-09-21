<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-03-28 17:43:45
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-04-08 14:16:41
-->
<template>
  <div class="mine">
    <!-- 顶部的背景 -->
    <div class="bg"></div>
    <!-- 顶部用户信息 -->
    <div class="userInfo">
      <!-- 用户头像 -->
      <div class="userFace">
        <img :src="userInfo.userFace" alt="" />
      </div>
      <!-- 用户名 -->
      <div class="userName">
        {{ userInfo.username }}
      </div>
    </div>
    <!-- 操作列表 指示列表 -->
    <div class="cellArea">
      <!-- title 标题 icon-是左侧图标 name-右侧图标 -->
      <van-cell title="我的收藏" icon="setting-o" @click="toAnotherPage">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="arrow" class="search-icon" />
        </template>
      </van-cell>
      <van-cell title="我的浏览" icon="setting-o"  @click="toAnotherPage">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="arrow" class="search-icon" />
        </template>
      </van-cell>

      <van-cell title="加我QQ" icon="service-o"  @click="toAnotherPage">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="arrow" class="search-icon" />
        </template>
      </van-cell>

    </div>
    <!-- 退出按钮 -->
    <div class="logoutBtn" @click="logoutHandler">退出登录</div>
  </div>
</template>

<script>
// 引入axios
import { get } from "../../http/axios";
// 引入token的工具类 获取当前登录用户的token
import { getToken, delToken } from "../../http/tokenUtils";
// 引入vant的dialog
import { Dialog } from "vant";
export default {
  data() {
    return {
      // 用户信息
      userInfo: {},
    };
  },
  created() {
    // 自动获取用户信息
    this.getUserInfoByToken();
  },
  methods: {
    toAnotherPage() {
      this.$router.push({
        path: "/another",
        query: {
          // 分类的名称
        },
      });
    },
    // 通过用户的token来获取用户的信息
    async getUserInfoByToken() {
      // 设置参数
      // console.log(getToken());
      let data = {
        token: getToken(),
      };
      // 发送网络请求
      let res = await get("/user/info", data);
      // console.log(res.data.data);
      this.userInfo = res.data.data;
    },
    // 退出登录
    logoutHandler() {
      // 做一个提示
      Dialog.confirm({
        message: "是否确认退出登录?",
        theme: "round-button",
      })
        .then(() => {
          // 点击确认按钮 执行退出登录
          // 清除掉本地保存的token  执行退出的网络操作
          delToken();
          // 跳转回到登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped>
/* 设置顶部的背景样式 */
.mine .bg {
  /* 设置渐变色 */
  background-image: linear-gradient(#7e7978, #312824);
  height: 200px;
  /* 设置底部左右两侧的弧度为一个圆形 */
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}
/* 用户区域样式 */
.mine .userInfo {
  background-color: #fff;
  width: 80%;
  height: 160px;
  /* 开启绝对定位 */
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -40%;
  /* 透明度 */
  opacity: 0.8;
  /* 阴影 */
  box-shadow: 0 0 10px #ccc;
  border-radius: 10px;
}
/* 用户区域头像样式 */
.userInfo .userFace {
  width: 100px;
  height: 100px;
  /* 要设置一个元素为圆形 */
  border-radius: 50%;
  /* margin: 0 auto; */
  position: absolute;
  left: 50%;
  /* 形变 平移 */
  transform: translate(-50%, -50%);
}
/* 用户区域头像的图片样式 */
.userInfo .userFace img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* 用户名的样式 */
.userInfo .userName {
  /* background-color: green; */
  text-align: center;
  margin-top: 70px;
  font-size: 25px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
/* 设置操作列表区域的样式 */
.mine .cellArea {
  margin: 120px auto;
  width: 95%;
  box-shadow: 4px 4px 4px 0 rgba(250, 96, 56, 0.3);
  border-radius: 10px;
}
/* van-cell的样式 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
/* 退出按钮的样式 */
.logoutBtn {
  width: 50%;
  /* 设置渐变色 */
  background-image: linear-gradient(#bcc3c2ea, #5d514d);
  text-align: center;
  color: #fff;
  /* 设置行高 */
  line-height: 35px;
  border-radius: 20px;
  margin: 0 auto;
  cursor: pointer;
}
</style>
