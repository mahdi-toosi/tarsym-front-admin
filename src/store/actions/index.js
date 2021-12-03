import Vue from "vue";
import axios from "axios";
import auth from "./auth";
import NProgress from "nprogress";

export default {
    ...auth,
    handleAxiosError({ commit }, error) {
        NProgress.done();
        let msg;
        if (error == "Error: Network Error") {
            msg = "مشکل در برقراری ارتباط با سرور";
            Vue.toasted.error(msg);
            return;
        }
        if (error.response) {
            const { status } = error.response;
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (status >= 500) msg = "مشکل در برقراری ارتباط با سرور";
            else if (status == 400) msg = "درخواست شما معتبر نمیباشد";
            else if (status == 404) msg = "دیتای درخواستی پیدا نشد ...";
            else if (status == 401) {
                msg = "شما دسترسی لازم را ندارید ...";
                commit("LOGOUT");
            } else {
                msg = "response get error , check the console";
                console.log("response get error => ", error);
            }
            Vue.toasted.error(msg);
        } else if (error.request) {
            console.log("request get error => ", error);
            Vue.toasted.error("request get error , check the console");
        } else {
            console.log("Error", error);
            Vue.toasted.error("check the console");
        }
    },
    loadMore({ state, dispatch }) {
        const lastRequest = state.lastQuery;

        const $skip = lastRequest.url === "/documents" ? state.docs.data.length : state.users.data.length;
        lastRequest.query.$skip = $skip;

        dispatch("getReq", lastRequest);
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
