<template>
  <div class="productList">
    <!-- 顶部的导航栏 -->
    <div class="navBar">
      <van-sticky>
        <van-nav-bar
          :title="$route.query.categoryName"
          left-text="返回"
          left-arrow
          @click-left="backClick"
        />
      </van-sticky>
    </div>
    <!-- 产品列表的区域 -->
    <div class="productContent">
      <!-- 左侧侧边栏 -->
      <div class="categorySideBar">
        <van-sidebar v-model="activeKey" @change="categoryChange">
          <van-sidebar-item :title="item.name" v-for="item in categoryData" :key="item.id" />
        </van-sidebar>
      </div>
      <!-- 右侧的产品列表区域 -->
      <div class="productList">
        <van-card
          v-for="item in productData"
          :key="item.id"
          :price="item.price"
          :desc="item.description"
          :title="item.name"
          :thumb="item.photo"
        >
          <!-- 使用插槽去自定义内容 -->
          <!-- 找到底部区域的插槽 自定义对应的结构 -->
          <!-- 获取对象中的数据 通过对象.key 去获取到 对应的属性 -->
          <!-- 向对象中添加一个值呢 也是通过点语法 -->
          <template #footer>
            <van-stepper default-value="0" :min="0" v-model="item.number" />
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
// 引入axios
import {get} from '../../http/axios'
export default {
  data() {
    return {
      // 当前被选中的是哪一个侧边栏
      activeKey: 0,
      value: 1,
      // 产品分类数据
      categoryData:[],
      // 产品分类的ID
      categoryID:'',
      // 产品数据
      productData:[]
    };
  },
  // 生命周期钩子函数
  created() {
    // 获取到路由传参传递过来的activeKey 给data中的对应的变量进行赋值
    this.activeKey = this.$route.query.activeKey
    // 获取到路由传参传递进来的categoryID
    this.categoryID = this.$route.query.productCategoryId
    // 自动获取产品分类数据  侧边导航栏数据
    this.getCategoryData()
    // 根据栏目ID 自动获取相应的产品数据
    this.getProductByCategoryID()
  },
  methods: {
    // 获取侧边导航栏数据
    async getCategoryData(){
      // 设置参数
      let data = {
        page: 1,
        pageSize: 100
      }
      // 发送请求
      let res = await get('/productCategory/pageQuery', data)
      // console.log(res);
      // 对对应的数据做一个赋值操作
      this.categoryData = res.data.data.list
    },
    // 根据栏目ID获取对应的产品数据
    async getProductByCategoryID(){
      // 设置参数
      let data = {
        page: 1,
        pageSize: 100,
        // 分类的id
        productCategoryId: this.categoryID
      }
      // 发送网络请求
      let res = await get('/product/pageQuery', data)
      // console.log(res);
      // 赋值操作
      this.productData = res.data.data.list
    },
    // 监听侧边栏切换事件
    categoryChange(index) {
      // 获取当前被选中的栏目的id
      console.log(this.categoryData[index].id);
      // 直接给data中的categoryID变量进行更新
      this.categoryID = this.categoryData[index].id
      // 重新的调用根据ID获取产品数据的方法
      this.getProductByCategoryID()
    },
    // 返回上一页
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* 产品区域整体的样式 */
.productContent{
  /* 将显示模式切换为flex布局 */
  display: flex;
  /* 设置一下整体的高度 */
  height: calc(100vh - 100px);
}
/* 左边侧边栏的样式 */
.productContent .categorySideBar{
  width: 120px;
  /* 让左侧的侧边栏固定不动 不随着滚动而滚动 */
  resize: horizontal;
  /* 必须设置overflow属性 才能使resize属性生效 */
  overflow: auto;
}
/* 调整导航栏里子元素的样式 */
.van-sidebar{
  width: 100%;
  text-align: center;
}
/* 右边产品列表的样式 */
.productContent .productList{
  flex: 1;
  overflow-y: auto;
}
</style>