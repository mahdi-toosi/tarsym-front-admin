import Vue from "vue";
import store from "../store/";

function beforeEach() {
    return async (to, from, next) => {
        if (to.name === "logout") {
            store.commit("LOGOUT");
            return;
        }
        if (to.matched.some((record) => record.meta.withoutAuth)) {
            // * scape authenticate
            next();
            return;
        } else if (checkForAuth(48)) {
            // minimum role = 48
            // * check authenticate
            next();
            return;
        } else if (set_user_if_exist(48)) {
            // minimum role = 48
            next();
            return;
        } else store.commit("LOGOUT");
    };
}
// function afterEach() {
//     return async (to) => {
//         const RN = to.name; // * route name
//     };
// }
export default {
    beforeEach,
    // afterEach,
};

// * Helper Functions
function set_user_if_exist(minimumRole) {
    const userData = JSON.parse(localStorage.getItem("sjufNEbjDmE")); // sjufNEbjDmE = userData
    if (!userData) return false;
    const now = new Date().getTime();
    if (userData && userData.expire > now) {
        // * add user
        store.commit("SET_USER", userData.user);
        store.commit("SET_USER_ACCESS_TOKEN", userData.accessToken);
        // * validate user role for route
        if (minimumRole <= store.state.user.role) return true;
        else {
            // Vue.toasted.error("اکانت شما دسترسی لازم برای استفاده از این صفحه را نداشت   ...");
            return false;
        }
    }
    return false;
}

function checkForAuth(minimumRole) {
    // * validate user role for route if exist
    if (store.getters.isAuthenticated) {
        if (minimumRole <= store.state.user.role) return true;
        else {
            Vue.toasted.error("اکانت شما دسترسی لازم برای استفاده از این صفحه را نداشت  ...");
            return false;
        }
    }
    return false;
}
