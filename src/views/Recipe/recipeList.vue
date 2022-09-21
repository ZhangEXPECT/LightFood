<template>
  <div class="productList">
    <!-- 顶部的导航栏 -->
    <div class="navBar">
      <van-sticky>
        <van-nav-bar
          title="轻 食"
          left-text="返回"
          left-arrow
          @click-left="backClick"
        />
      </van-sticky>
    </div>

    <div class="head">
      <div class="head-title">{{this.categoryName}}</div>
      <div class="sort-mode">
        <div class="sort-select" id="sortDefault">综合最佳</div>
        <div class="sort-default" id="sortSelect">收藏最多</div>
      </div>
    </div>
    <div class="page">
      <div class="list">
        <div
          class="recipe-list"
          v-for="item in productData"
          :key="item.index"
          @click="toRecipeDetailPage(item)"
        >
          <div class="list-left">
            <img
              :src="item.pic"
              class="related-recipe-cover"
              mode="aspectFill"
              alt="加载失败"
            />
          </div>
          <div class="list-right">
            <div class="recipe-title">{{ item.name }}</div>
            <div class="related-recipe-counts">
              <div class="related-recipe-viewcount">{{ item.id }}热度</div>
              <div class="related-recipe-likecount">{{ item.id * 2 }}收藏</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入axios
// import {get} from '../../http/axios'
import axios from "axios";
export default {
  data() {
    return {
      // 产品分类的Name
      categoryName: "",
      // 产品分类数据
      productData: [],
    };
  },
  // 生命周期钩子函数
  created() {
    // 获取到路由传参传递进来的categoryIName
    this.categoryName = this.$route.query.categoryName;
    this.getProductData();
  },
  methods: {
    // 返回上一页
    backClick() {
      this.$router.go(-1);
    },
    toRecipeDetailPage(recipe) {
      // console.log(productCategoryId);
      // 跳转到详情页面 并 传参
      this.$router.push({
        // 页面的路径
        path: "/recipe/detail",
        // 传递的参数
        query: {
          // 分类的名称
          recipeName: recipe.name,
          // 菜名id
          recipeId: recipe.id,
        },
      });
    },
    // 获取分类列表
    getProductData() {
      axios({
        // https://way.jd.com/jisuapi/search?keyword=家常菜&num=10&start=0&appkey=7eca72f7f5acd4df342609e0ec45e098
        url: "/EXPECT/jisuapi/search",
        params: {
          keyword: this.categoryName,
          start: 0,
          num: 20,
          // api_key
          appkey: "7eca72f7f5acd4df342609e0ec45e098",
        },
        method: "get",
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.result.result.list);
        this.productData = res.data.result.result.list;
      });
    },
  },
};
</script>

<style scoped>
/* 产品区域整体的样式 */
.productList {
  /* 设置一下整体的高度 */
  height: auto;
}
.head {
  background: #fff;
  display: flex;

  padding: 10px;
  padding-top: 0px;
  width: 95%;
  position: fixed;
  height: 60px;
  float: left;
  font-size: 20px;
  height: 62px;
  margin-left: 10px;
}

.head-title {
  color: #000;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 23px;
  line-height: 67px;
  width: 200px;
}

.sort-mode {
  display: flex;
  padding: 13px 0 0 10px;
}

.sort-default {
  color: #666;
}

.sort-default,
.sort-select {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 42px;
  padding: 0px;
  margin-right: 20px;
  width: 60px;
}

.sort-select {
  color: #d42c1f;
}

.page {
  padding: 60px 20px 15px 10px;
  /* position: fixed; */
  top: 115px;
  width: 95%;
  margin: 0px auto;
  height: 100%;
  /* background-color: #d42c1f; */
}

.list {
  padding-top: 10px;
  height: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.recipe-list {
  /* height: auto; */
  padding-top: 5px;
  margin-bottom: 20px;
  display: flex;
  overflow-y: scroll;
}
.list-left {
  height: auto;
}

.related-recipe-cover {
  border-radius: 10px;
  height: 100px;
  width: 150px;
}

.list-right {
  height: auto;
  padding: 0 0 0 20px;
}

.recipe-title {
  color: #000;
  font-size: 15px;
  font-weight: 400;
  height: 80px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: auto;
}

.related-recipe-counts {
  display: flex;
  padding-top: 11rpx;
}

.related-recipe-likecount,
.related-recipe-viewcount {
  color: #999;
  font-size: 10px;
  font-weight: 400;
  width: 65px;
}

.related-recipe-likecount {
  padding-left: 15px;
  width: 80px;
}
</style>
