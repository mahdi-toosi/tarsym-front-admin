<template>
    <header>
        <ul>
            <router-link to="/usersDocs" tag="li">
                <i class="fas fa-map-marked-alt"></i>
                داکیومنت های کاربران
            </router-link>
            <router-link to="/adminDocs" tag="li">
                <i class="fas fa-map-marked-alt"></i>
                داکیومنت های ادمین
            </router-link>
            <router-link to="/users" tag="li">
                <i class="fas fa-users"></i>
                کاربران
            </router-link>
            <router-link to="/" tag="li">
                <i class="fas fa-home"></i>
                صفحه نخست
            </router-link>
            <li @click="$store.commit('LOGOUT')">
                <i class="fas fa-sign-out-alt"></i>
                خروج
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    name: "navigation"
};
</script>

<style lang="scss" scoped>
header {
    position: sticky;
    top: 0;
    z-index: 999;
}
ul {
    list-style: none;
    display: flex;
    justify-content: center;
    color: white;
    background: #6262625c;
    backdrop-filter: blur(4px);
    margin: 0px;
    align-items: center;
    li {
        display: inline;
        margin: 7px 40px;
        padding: 8px;
        cursor: pointer;
        transition: 0.3s;
        position: relative;
        &:hover {
            color: #dedede;
        }
        &::after {
            content: "";
            width: 100%;
            position: absolute;
            bottom: 0px;
            right: 0px;
            transition: 0.2s;
        }
    }
}
.router-link-exact-active::after {
    border-bottom: 2px red solid;
}
</style>