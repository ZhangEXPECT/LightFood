<template>
<div>
    <!-- 顶部的导航栏 -->
    <div class="navBar">
        <van-sticky>
            <van-nav-bar title="我的页面跳转" left-text="返回" left-arrow @click-left="backClick" />
        </van-sticky>
    </div>
    666
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        // 返回上一页
        backClick() {
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>

</style>
