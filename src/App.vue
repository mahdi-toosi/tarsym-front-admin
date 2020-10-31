<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    name: "App"
};
</script>
<style lang="scss">
@import "@/assets/scss/main.scss";
body {
    background-image: url("/imgs/bg.jpg");
    background-size: cover;
}
</style>
