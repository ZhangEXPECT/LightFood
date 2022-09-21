<template>
  <div class="home">
    <!-- 顶部导航栏 -->

    <div class="header">
      <div class="logo" @click="toMePage"></div>
      <van-search
        shape="round"
        background="#ffff"
        placeholder="请输入搜索关键词"
      />
      <div class="searchAft"><van-icon name="ellipsis" /></div>
    </div>

    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiperData1" :key="item.id">
          <div class="slide">
            <img :src="item.url" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 通知栏 -->
    <div class="banner-title">
      <div class="banner-tage">每日精选 <van-icon name="info-o" /></div>
      <!-- 可以设置动态随着轮播图更新 -->
      <div class="title-banner">梭子蟹炒年糕</div>
    </div>

    <!-- 菜单栏 产品分类相关接口 -->
    <div class="gridMenu">
      <van-grid :column-num="5">
        <van-grid-item
          v-for="item in categoryData1"
          :key="item.id"
          @click="toRecipeListPage(item)"
          :icon="item.url"
          :text="item.name"
        />
      </van-grid>
    </div>
    <!-- 菜谱排行 -->   
     <!-- 横向滚动栏-->
    <div class="index-rank">
      <div class="rank-head">
        <div class="head-title">菜谱排行榜</div>
        <div navigateBack hoverClass="none" url="../cate/ranklist/ranklist">
          <div class="rank-more">
            更多
            <img class="more-img" src="../../images/common/more.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 菜谱推荐 -->
    <div class="index-list">
      <div class="list-title">每日推荐</div>
      <div class="recipe-list" v-for="item in recipe_list" :key="item.index"  @click="toRecipeDetailPage(item)">
        <div class="recipe-content">
          <div class="recipe-title">{{ item.name }}</div>
          <div class="recipe-count">
            <img class="play-button-img" :src="item.pic" alt="加载失败" />
            <div style="display:flex; ">
              <div class="recipe-view-count">4.7万热度</div>
              <div class="recipe-like-count">52收藏</div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
// 引入axios
// import { get } from "../../http/axios";
import axios from "axios";
export default {
  data() {
    return {
      // 轮播图的数组
      swiperData: [],
      swiperData1: [
        {
          id: "1",
          url: "http://api.jisuapi.com/recipe/upload/20160719/122305_25405.jpg",
          name: "梭子蟹炒年糕",
        },
        {
          id: "2",
          url: "http://api.jisuapi.com/recipe/upload/20160719/115152_15254.jpg",
          name: "桃胶薏米红豆糊",
        },
        {
          id: "3",
          url: "http://api.jisuapi.com/recipe/upload/20160719/133506_96767.jpg",
          name: "蛋糕卷肉松面包",
        },
      ],
      // 分类数据
      categoryData: [],
      categoryData1: [
        {
          id: "1",
          url: require("../images/menu/4a1ee87.png"),
          name: "家常菜",
        },
        {
          id: "2",
          url: require("../images/menu/4a3die4.png"),
          name: "下饭菜",
        },
        {
          id: "3",
          url: require("../images/menu/4a7c729.png"),
          name: "快手菜",
        },
        {
          id: "4",
          url: require("../images/menu/54ahadf.png"),
          name: "早餐",
        },
        {
          id: "5",
          url: require("../images/menu/455egff.png"),
          name: "鸡蛋",
        },
        {
          id: "6",
          url: require("../images/menu/6icidef.png"),
          name: "烘焙",
        },
        {
          id: "7",
          url: require("../images/menu/5a625b5.png"),
          name: "汤羹",
        },
        {
          id: "8",
          url: require("../images/menu/c7f2545.png"),
          name: "孕妇",
        },
        {
          id: "9",
          url: require("../images/menu/4b91e0a.png"),
          name: "主食",
        },
        {
          id: "10",
          url: require("../images/menu/more.png"),
          name: "更多",
        },
      ],
      recipe_list: [],
    };
  },
  // 生命周期钩子函数 在页面加载的特定时期 自动的去执行一些方法 获取数据
  created() {
    this.getSwipereData();
    this.getRecipeData();
  },
  methods: {
    // 跳转
    toMePage(){
        this.$router.push({path: "/manage/me"
        })
    },
    // 详情页跳转
    toRecipeDetailPage(recipe) {
       console.log(recipe.id);
      // 跳转到详情页面 并 传参
      this.$router.push({
        // 页面的路径
        path: "/recipe/detail",
        // 传递的参数
        query: {
          // 分类的名称
          recipeId: recipe.id,
        },
      });
    },
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
  
    getSwipereData() {
      axios({
        // https://way.jd.com/jisuapi/byclass?classid=2&start=0&num=5&appkey=7eca72f7f5acd4df342609e0ec45e098
        url: "/EXPECT/jisuapi/byclass",
        params: {
          classid: 4,
          start: 0,
          num: 3,
          // api_key
          appkey: "7eca72f7f5acd4df342609e0ec45e098",
        },
        method: "get",
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.result.result.list);
        this.swiperData = res.data.result.result.list;
      });
    },


    // 请求推荐菜谱数据
    getRecipeData() {
      axios({
        // https://way.jd.com/jisuapi/byclass?classid=2&start=0&num=5&appkey=7eca72f7f5acd4df342609e0ec45e098
        url: "/EXPECT/jisuapi/byclass",
        params: {
          classid: 2,
          start: 0,
          num: 10,
          // api_key
          appkey: "7eca72f7f5acd4df342609e0ec45e098",
        },
        method: "get",
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.result.result.list);
        this.recipe_list = res.data.result.result.list;
      });
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

.my-swipe {
  height: 200px;
  padding: 5px 10px 5px 10px;
  position: relative;
  width: 100%;
}
/* 设置轮播图里图片的样式 */
.van-swipe-item {
  position: relative;
  box-sizing: border-box;
  padding: 0px 10px;
  overflow: hidden;
}

.slide {
  /* margin-left: 20px; */
  width: 90%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  background: #f4f4f4;
}

.my-swipe .van-swipe-item .slide img {
  width: 100%;
  height: 100%;
}
.top {
  display: flex;
}
.banner-title {
  margin-top: 3px;
  display: flex;
  flex-direction: row;
  padding: 2px 20px 2px 20px;
  width: 100%;
}
.van-notice-bar {
  height: 25px;
  background-color: #fff;
}

.banner-tage {
  background-color: #d51b1e;
  border-radius: 30px;
  color: #fff;
  font-size: 5px;
  padding: 0px;
  text-align: center;
  width: 80px;
}
.title-banner {
  overflow: hidden;
  padding-left: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
  font-size: 5px;
}
.head-title {
  padding-left: 10px;
  color: #000;
  float: left;
  font-size: 20px;
  font-weight: 500;
  height: 62px;
  line-height: 62px;
  width: 224px;
  margin-left: 15px;
}
.rank-more {
  color: #000;
  float: right;
  font-size: 13px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
  padding: 5px 10px 5px 30px;
  width: 55px;
}

.more-img {
  height: 10px;
  width: 10px;
  padding: 0px 0px 0px 5px;
}

.index-list {
  height: auto;
  padding: 25px 25px 20px;
}

.list-title {
  color: #000;
  float: left;
  font-size: 20px;
  font-weight: 500;
  height: 62px;
  line-height: 62px;
  width: 224px;
  margin-left: 0px;
}

.recipe-list {
  height: auto;
  padding-top: 10px;
}

.recipe-content {
  height: auto;
}

.recipe-title {
  color: #000;
  font-size: 17px;
  font-weight: 500;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  padding: 2px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 316px;
}

.recipe-count {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding-top: 0px;
  margin: 0px;
  height: 212px;
  width: 310px;
}
.play-button-img {
  height: 80%;
  /* margin: 80px 0px 0px -187px; */

  position: relative;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 6px;
}
.recipe-like-count,.recipe-view-count {
    color: #999;
    font-size: 15px;
    font-weight: 400;
    height: 10px;
    line-height:10px;
    width: auto;
    margin-right: 10px;
}

</style>
