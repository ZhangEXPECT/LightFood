<template>
  <div class="content">
    <!-- 顶部的导航栏 -->
    <div class="navBar">
      <van-sticky>
        <van-nav-bar
          title="菜谱详情"
          left-text="返回"
          left-arrow
          @click-left="backClick"
        />
      </van-sticky>
    </div>

    <!--菜谱图片-->
    <div class="recipe-cover">
      <img :src="recipeDetail.pic" alt="" />
    </div>
    <div class="recipe-detail">
      <div class="title">{{ recipeDetail.name }}</div>
      <div class="recipe-count">
        <div class="recipe-view-count">{{ recipeDetail.id * 123 }}万热度</div>
        <div class="recipe-view-count recipe-like-count">
          {{ recipeDetail.id * 5 }}收藏
        </div>
      </div>
      <!-- 菜谱介绍 -->
      <div class="recipe-infor">{{ recipeDetail.content }}</div>

      <div class="operating-view">
        <div class="cookie-time">烹饪时间:{{ recipeDetail.preparetime }}</div>
        <div class="enjoy-user">用餐人数:{{ recipeDetail.peoplenum }}</div>
      </div>

      <div class="food-title">食材</div>
      <div class="food">
        <div class="food-name">小葱</div>
        <div class="food-name food-num">65g</div>
      </div>
      <div class="food">
        <div class="food-name">姜</div>
        <div class="food-name food-num">20g</div>
      </div>
      <div class="food">
        <div class="food-name">盐</div>
        <div class="food-name food-num">5g</div>
      </div>
      <div class="food">
        <div class="food-name">...</div>
        <div class="food-name food-num">...</div>
      </div>

      <!--详细步骤-->
      <div class="step-title">烹饪步骤</div>
      <div class="step" v-for="(item,index) in process" :key="index">
        <div class="step-num" v-if="i < process.length">
          步骤 {{ index+1}} / {{ process.length }}
        </div>
        <img class="step-img" :src="item.pic" alt="加载失败" />
        <div class="step-content">{{ item.pcontent }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      recipeDetail: "",
      i: "0",
      process: [],
    };
  },
//   computed: {
//     result() {
//       let i = 0;
//       if (i < this.process.length) {
//         this.i = i++;
//       }
//       return i;
//     },
//   },
  created() {
    this.recipeId = this.$route.query.recipeId;
    this.getRecipeById();
  },
  methods: {
    // 返回上一页

    backClick() {
      this.$router.go(-1);
    },

    getRecipeById() {
      axios({
        //    Url:https://way.jd.com/jisuapi/detail?id=5&appkey=7eca72f7f5acd4df342609e0ec45e098
        url: "/EXPECT/jisuapi/detail",
        params: {
          id: this.recipeId,
          // api_key
          appkey: "7eca72f7f5acd4df342609e0ec45e098",
        },
        method: "get",
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.result.result);
        // console.log(res.data.result.result.process);
        this.recipeDetail = res.data.result.result;
        this.process = res.data.result.result.process;
      });
    },
  },
};
</script>

<style scoped>
.recipe-cover {
  /* position: relative; */
  height: 230px;
  padding-top: 2px;
  width: 100%;
  /* background-color: aqua; */
  text-align: center;
}
.recipe-cover img {
  height: 230px;
  width: 100%;
}
.recipe-detail {
  /* position: fixed; */
  /* top: 280px; */
  /* display: flex; */
  /* background-color: brown; */
  width: 89%;
  height: auto;
  padding: 20px 20px 0px 20px;
}
.title {
  color: #333;
  font-size: 20px;
  font-weight: 500;
  height: auto;
  line-height: 30px;
  width: 500px;
}
.recipe-count {
  display: flex;
  padding: 2px 0;
}

.recipe-view-count {
  color: #999;
  font-size: 10px;
  font-weight: 400;
  height: 37px;
  line-height: 30px;
  width: 200px;
  margin-left: 20px;
}

.recipe-like-count {
  width: 261px;
}

.recipe-infor {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: #000;
  height: auto;
  padding-top: 30px;
  width: auto;
}
.operating-view {
  display: flex;
  padding-top: 5px;
}

.cookie-time,
.enjoy-user {
  color: #999;
  font-size: 10px;
  font-weight: 400;
  width: 180px;
}

.enjoy-user {
  padding-left: 15px;
  width: 100px;
}
.food-title {
  color: #000;
  font-size: 24px;
  font-weight: 500;
  height: 30px;
  line-height: 30px;
  padding-top: 20px;
  padding-bottom: 15px;
  width: 311px;
}
.food {
  display: flex;
}
.food-name {
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 50px;
  text-align: left;
  width: 300px;
  margin-left: 2px;
}

.food-name-url {
  color: #406599;
}

.food-num {
  text-align: right;
}
.step-title {
  color: #000;
  font-size: 23px;
  font-weight: 500;
  height: 30px;
  line-height: 30px;
  width: auto;
}
.step,
.step-hide {
  height: auto;
}

.step-hide {
  display: none;
}

.step-num {
  color: #000;
  font-size: 15px;
  font-weight: 500;
  height: 24px;
  line-height: 24px;
  padding: 30px 0 13px;
  width: 300px;
}

.step-img {
  border-radius: 10px;
  height: 212px;
  width: 310px;
}

.step-content {
  color: #000;
  font-size: 15px;
  font-weight: 400;
  height: auto;
  line-height: 24px;
  padding-top: 16px;
  width: 310px;
}
</style>
