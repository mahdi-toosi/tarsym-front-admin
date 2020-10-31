import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import auth from "./actions/auth";
Vue.use(Vuex);

export default new Vuex.Store({
    state: { user: {} },
    mutations: {
        LOGOUT(state) {
            localStorage.removeItem("sjufNEbjDmE"); // sjufNEbjDmE = userData
            localStorage.removeItem("kemskDJobjgR"); // kemskDJobjgR = access key
            state.user = {};
            router.push("/login");
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_USER_ACCESS_TOKEN(state, token) {
            if (state.user) state.user.accessToken = token;
        },
    },
    actions: {
        ...auth, // !  handleAxiosError
        handleAxiosError({ commit }, error) {
            let msg;
            if (error == "Error: Network Error") msg = "مشکل در برقراری ارتباط با سرور";
            else if (error == "Error: Request failed with status code 409") msg = "مختصات شاخص قبلا به ثبت رسیده است";
            else if (error == "Error: Request failed with status code 503") msg = "مشکل در برقراری ارتباط با سرور";
            else if (error == "Error: Request failed with status code 400") msg = "درخواست شما معتبر نمیباشد";
            else if (error == "Error: Request failed with status code 500") msg = "مشکلی در سرور بوجود آمده است";
            else if (error == "Error: Request failed with status code 404") msg = "دیتای درخواستی پیدا نشد ...";
            else if (error == "Error: Request failed with status code 401") {
                // msg = "نام کاربری یا رمز عبور اشتباه است"
                commit("LOGOUT");
            } else {
                msg = error;
                // msg = "مشکلی در ارتباط با سرور بوجود آمده، لطفا چند دقیقه بعد دوباره امتحان کنید";
                console.log("request get error => ", msg);
            }
            Vue.toasted.error(msg);
        },
    },
    getters: {
        isAuthenticated: (state) => state.user.username,
    },
    modules: {},
});
