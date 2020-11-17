import Vue from "vue";
import axios from "axios";
import auth from "./auth";
export default {
    ...auth,
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
    async getDocs({ dispatch, commit }, query) {
        commit("CLEAR_DOCS");
        await axios
            .get("/documents", { params: query })
            .then(({ data }) => {
                commit("SET_DOCS", data);
                commit("SET_LAST_QUERY", query);
            })
            .catch((error) => {
                dispatch("handleAxiosError", error);
            });
    },
    loadMore({ state, dispatch }) {
        const $skip = state.docs.data.length;
        const lastQuery = state.lastQuery;
        lastQuery.params.$skip = $skip;
        dispatch("getDocs", lastQuery);
    },
};
