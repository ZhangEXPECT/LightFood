<template>
  <div>
    <!-- 声明渲染组件routerView -->
    <router-view></router-view>
    <!-- 创建tabbar结构 -->
    <van-tabbar v-model="active">
      <!-- 首页 -->
      <van-tabbar-item icon="home-o" to="/manage/home">首页</van-tabbar-item>
      <!-- 关于 -->
      <van-tabbar-item icon="search" to="/manage/about">分类</van-tabbar-item>
      <!-- 我的 -->
      <van-tabbar-item icon="friends-o" to="/manage/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped>
</style>