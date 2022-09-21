<template>
  <div class="content">
    <!-- 顶部的导航栏 -->
    <!-- 顶部导航栏 -->

    <div class="header">
      <div class="logo" @click="toHomePage"></div>
      <van-search
        shape="round"
        background="#ffff"
        placeholder="请输入搜索关键词"
      />
      <div class="searchAft"><van-icon name="ellipsis" /></div>
    </div>

    <!-- 产品列表的区域 -->
    <div class="productContent">
      <!-- 左侧侧边栏  -->
      <div class="categorySideBar">
        <van-sidebar v-model="activeKey" @change="categoryChange">
          <van-sidebar-item
            :title="item.name"
            v-for="item in categoryData"
            :key="item.index"
          />
        </van-sidebar>
      </div>
      <!-- 右侧的产品列表区域 -->
      <div class="productList">
        <div class="try">
          <div class="cate-type" v-for="item in productData" :key="item.id">
            <div class="cate">
              <div class="cate-name-but" @click="toRecipeListPage(item)">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入axios
import axios from "axios";
export default {
  data() {
    return {
      // 当前被选中的是哪一个侧边栏
      activeKey: 0,
      value: 1,
      // 产品分类数据
      categoryData: [],
      // 产品分类的ID
      categoryID: "",
      // 产品数据
      productData: [],
    };
  },
  // 生命周期钩子函数
  created() {
    // 自动获取产品分类数据  侧边导航栏数据
    this.getCategoryData();
    // 根据栏目ID 自动获取相应的产品数据
    // this.getProductByCategoryID();
  },
  methods: {

       toRecipeListPage(category){
      
      // 跳转到详情页面 并 传参
      this.$router.push({
        // 页面的路径
        path: "/recipe/list",
        // 传递的参数
        query: {

          // 分类的名称
          categoryName: category.name,
          // 当前点击的是哪一个分类
        },
      });

    },
    // 跳转
    toHomePage() {
      this.$router.push({ path: "/manage/me" });
    },
    // 获取侧边导航栏数据
    getCategoryData() {
      axios({
        // https://way.jd.com/jisuapi/recipe_class?appkey=7eca72f7f5acd4df342609e0ec45e098
        url: "/EXPECT/jisuapi/recipe_class",
        params: {
          // api_key
          appkey: "7eca72f7f5acd4df342609e0ec45e098",
        },
        method: "get",
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.result.result);
        this.categoryData = res.data.result.result;
      });
    },
    // 监听侧边栏切换事件
    categoryChange(index) {
      // 获取当前被选中的栏目的id
      console.log(this.categoryData[index].classid);
      // 直接给data中的categoryID变量进行更新
      this.categoryID = this.categoryData[index].classid;
      // 重新的调用根据ID获取产品数据的方法
      this.productData = this.categoryData[index].list.slice(0, 10);
      console.log(this.productData);
    },
  },
};
</script>

<style scoped>
.header {
  display: -webkit-box;
  display: -webkit-flex;
  height: 50px;
  border-bottom: 2px solid #cccccc;
  margin-bottom: 5px;
}
.header .logo {
  height: 41px;
  width: 62px;
  float: left;
  background-image: url(../images/logo.png);

  background-size: no-repeat;
  background-size: 70px 42px;
  overflow: hidden;
}
.van-search {
  /* display: -webkit-box;
  display: -webkit-flex; */
  display: flex;
  /* -webkit-box-align: center;
  -webkit-align-items: center; */
  align-items: center;
  /* box-sizing: border-box; */
  padding: 10px 12px;
  /* background-color: #fff; */
  width: 78%;
  margin-left: 0px;
}
.searchAft {
  width: 38px;
  padding-top: 15px;
  padding-left: 5px;
}
/* 产品区域整体的样式 */
.productContent {
  /* 将显示模式切换为flex布局 */
  display: flex;
  /* 设置一下整体的高度 */
  height: calc(100vh - 100px);
}
/* 左边侧边栏的样式 */
.productContent .categorySideBar {
  width: 120px;
  /* 让左侧的侧边栏固定不动 不随着滚动而滚动 */
  resize: horizontal;
  /* 必须设置overflow属性 才能使resize属性生效 */
  overflow: auto;
}
/* 调整导航栏里子元素的样式 */
.van-sidebar {
  width: 100%;
  text-align: center;
}
/* 右边产品列表的样式 */
.productContent .productList {
  flex: 2;
  /* overflow-y: auto; */
}
.productList {
  padding: 0px 10px 0px 10px;
}

.cate-type {
  display: flex;
  padding: 0 2px;
  /* background-color: aqua; */

  margin: 0px auto;
  width: 100px;
}
.cate {
  border: 1px solid #9d9d9d;
  border-radius: 20px;
  height: 30px;
  margin: 10px 4px 0px 5px;
  width: 60px;
}
.cate-name-but {
  color: #000;
  font-size: 15px;
  font-weight: 400;
  height: 33px;
  line-height: 32px;
  text-align: center;
}
</style>
