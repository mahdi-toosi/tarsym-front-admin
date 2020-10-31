import Vue from "vue";
import VueRouter from "vue-router";
import Helpers from "./beforeAndAfterEachRoute";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/Home.vue"),
        meta: {
            minimumRole: 48,
        },
    },
    {
        path: "/login",
        name: "LoginPage",
        component: () => import("@/views/Login.vue"),
        meta: {
            withoutAuth: true,
        },
    },
    {
        path: "*",
        name: "404 page",
        component: () => import("@/views/404.vue"),
        meta: {
            withoutAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(Helpers.beforeEach());
// router.afterEach(Helpers.afterEach());

export default router;
