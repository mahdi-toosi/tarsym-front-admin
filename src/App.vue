<template>
    <div id="app">
        <SidebarMenu
            :menu="menu"
            v-if="displayNav"
            :width="'250px'"
            :collapsed="true"
            :rtl="true"
            ref="sidebarNav"
        >
            <span slot="header" class="header">
                <img src="./assets/logo.png" alt="" />
            </span>
        </SidebarMenu>

        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
    name: "App",
    data() {
        return {
            menu: [
                {
                    header: true,
                    title: "پنل ادمین ترسیم",
                    hiddenOnCollapse: true,
                },

                {
                    href: "/",
                    title: "صفحه نخست",
                    icon: "fas fa-home",
                },
                {
                    href: "/usersDocs",
                    title: "داکیومنت های کاربران",
                    icon: "fas fa-map-marked-alt",
                    child: [
                        {
                            href: "/usersDocs/star",
                            title: "ستاره دار",
                            icon: "fas fa-star",
                        },
                        {
                            href: "/usersDocs/read",
                            title: "خوانده شده",
                            icon: "fas fa-check-double",
                        },
                    ],
                },
                {
                    href: "/adminDocs",
                    title: "داکیومنت های ادمین",
                    icon: "fas fa-map-marked-alt",
                    child: [
                        {
                            href: "/adminDocs/star",
                            title: "ستاره دار",
                            icon: "fas fa-star",
                        },
                    ],
                },
                {
                    href: "/users",
                    title: "کاربران",
                    icon: "fas fa-users",
                },
                {
                    href: "/logout",
                    title: "خروج",
                    icon: "fas fa-sign-out-alt",
                },
            ],
        };
    },
    methods: {},
    components: {
        SidebarMenu,
    },
    computed: {
        displayNav() {
            const role = this.$store.state.user.role;
            return role && role >= 48;
        },
    },
};
</script>
<style lang="scss">
@import "@/assets/scss/main.scss";
// *  vue router animation
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

// * END vue router animation
</style>
