<template>
    <div id="app">
        <Navigation-menu v-if="displayNav" />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
import NavigationMenu from "@/components/navigation";
export default {
    name: "App",
    components: {
        NavigationMenu,
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
