import Vue from "vue";
import VueRouter from "vue-router";
import Helpers from "./beforeAndAfterEachRoute";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/adminDocs",
        name: "adminDocsPage",
        component: () => import("@/views/Docs/adminDocs.vue"),
    },
    {
        path: "/usersDocs",
        name: "usersDocsPage",
        component: () => import("@/views/Docs/usersDocs.vue"),
    },
    {
        path: "/users",
        name: "usersPage",
        component: () => import("@/views/Users.vue"),
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
        path: "/logout",
        name: "logout",
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
