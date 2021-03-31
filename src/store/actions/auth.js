import Vue from "vue";
import router from "../../router";
import axios from "axios";
import NProgress from "nprogress";

export default {
    async login({ dispatch }, user) {
        const data = {
                strategy: "local",
                ...user,
            },
            url = "/authentication";

        await axios
            .post(url, data)
            .then(async (res) => {
                const role = res.data.user.role;
                if (role == 1) {
                    // * suspension
                    const msg = "در حال حاضر اکانت شما توسط ادمین به حالت تعلیق در آمده";
                    Vue.toasted.error(msg);
                    return;
                } else if (role >= 48) {
                    await dispatch("addDataToAxiosAndLocalStorage", res.data);

                    await router.push("/");
                } else {
                    const msg = "شما ادمین ترسیم نیستید !";
                    Vue.toasted.error(msg);
                }
            })
            .catch((error) => {
                if (error == "Error: Request failed with status code 401") {
                    const msg = "نام کاربری یا رمز عبور اشتباه است ...";
                    Vue.toasted.error(msg);
                    NProgress.done();
                    return;
                }
                dispatch("handleAxiosError", error);
            });
    },
    addDataToAxiosAndLocalStorage(store, data) {
        const day = 60 * 60 * 1000 * 4; //* 4 hours
        data.expire = new Date().getTime() + day;
        localStorage.setItem("sjufNEbjDmE", JSON.stringify(data)); //* sjufNEbjDmE = userData
        localStorage.setItem("kemskDJobjgR", data.accessToken); //* kemskDJobjgR = access key
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
    },
};
