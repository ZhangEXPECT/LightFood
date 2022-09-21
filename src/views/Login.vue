<template>
  <div class="login">
    <!-- 登录页面的头部区域 -->
    <div class="header">
      <div class="userimg">
        <van-icon name="user-circle-o" size="80"/></div>
    </div>
    <!-- 登录表单的区域 -->
    <div class="loginArea">
      <!-- 用户名 密码 按钮的表单结构 -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 引入axios
import { post_json } from "../http/axios";
// 引入存取token的工具类
import { setToken } from "../http/tokenUtils";
export default {
  data() {
    return {
      // 用户名
      username: "",
      // 密码
      password: "",
    };
  },
  methods: {
    // 登录事件
    async onSubmit() {
      // 设置对应的参数
      let data = {
        // 用户名
        username: this.username,
        // 密码
        password: this.password,
      };
      // 发送网络请求
      let res = await post_json("/user/login", data);
      console.log(res);
      // 判断用户登录是否成功
      if (res.data.status == 200) {
        // 登录成功 保存token
        setToken(res.data.data.token);
        // 跳转到首页
        this.$router.push("/manage/home");
      } else {
        // 登录失败 提示一些登录失败相关的信息
      }
      //增加注册模块 
    },
  },
};
</script>

<style scoped>
/* 调整页面样式 */
/* 设置页面的整体样式 */
.login {
  width: 100%;
  /* vh视窗高度 */
  height: 100vh;
  /* 设置渐变色 */
  /* background-image: linear-gradient(#005aa7, #fffde4); */
  background-image: url(../images/Q2.jpg);
  background-size:  no-repeat ;
  background-size: contain ;
  overflow: hidden;
}

/* 设置头部区域的样式 */
.header {
  width: 100%;
  text-align: center;
  /* 定位布局 */
  /* 声明为绝对定位布局 */
  position: absolute;
  /* 距离顶部120px */
  top: 110px;
  left: 10px;
}

/* 设置头部区域里的图标样式 */
.header .userimg {
  color: rgba(255, 255, 255, 0.5);
  font-size: 40px;
}

.van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: white;
    font-size: 14px;
    line-height: 24px;
    background-color: rgba(255, 255, 255, 0.2);
}
/* 登录区域的样式 */
.loginArea {
  width: 80%;
  /* 通过外边距的形式 */
  margin: 230px  auto;
  /* 卡片效果 */
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
  background-color: rgba(18, 1, 1, 0.2);
  height: 200px;
  /* 设置圆角 */
  border-radius: 15px;
  /* 设置内边距 */
  padding: 10px;

}
</style>
