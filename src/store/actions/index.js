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
    loadMore({ state, dispatch }) {
        const lastRequest = state.lastQuery;

        const $skip = lastRequest.url === "/documents" ? state.docs.data.length : state.users.data.length;
        lastRequest.query.$skip = $skip;

        dispatch("getRequest", lastRequest);
    },
    async getReq({ commit, dispatch }, req) {
        await axios
            .get(req.url, { params: req.query })
            .then(({ data }) => {
                commit("SET_DATA", { data, url: req.url });
                commit("SET_LAST_REQUEST", req);
            })
            .catch((error) => {
                dispatch("handleAxiosError", error);
            });
    },
};
