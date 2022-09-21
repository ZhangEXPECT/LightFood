import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    // 路由的重定向 用户第一次进入程序时 进入登录界面
    {
        path: "/",
        redirect: "/login",
    },
    // 登录页面的路由
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("../views/Login.vue"),
    },
    // 管理页面的路由
    {
        path: "/manage",
        name: "Manage",
        component: () =>
            import ("../views/Manage.vue"),
        // 配置子路由
        children: [
            // 首页
            {
                path: "home",
                component: () =>
                    import ("../views/Home/home.vue"),
            },
            // 分类页面
            {
                path: "about",
                component: () =>
                    import ("../views/About/about.vue"),
            },
            // 我的页面
            {
                path: "me",
                component: () =>
                    import ("../views/Me/me.vue"),
            },
        ],
    },
    {
        path: "/recipe/detail",
        component: () =>
            import ("../views/Recipe/recipeDetail.vue"),
    },
    {
        path: "/recipe/list",
        component: () =>
            import ("../views/Recipe/recipeList.vue"),
    },
    {
        path: "/another",
        component: () =>
            import ("../views/another.vue"),
    },
];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;