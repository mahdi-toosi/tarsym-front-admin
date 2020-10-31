import Vue from "vue";
import router from "../../router";
import axios from "axios";

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
                // * suspension
                if (res.data.user.role == 1) {
                    const msg = "در حال حاضر اکانت شما توسط ادمین به حالت تعلیق در آمده";
                    Vue.toasted.error(msg);
                    return;
                }

                await dispatch("addDataToAxiosAndLocalStorage", res.data);

                await router.push("/");
            })
            .catch((error) => {
                if (error == "Error: Request failed with status code 401") {
                    const msg = "نام کاربری یا رمز عبور اشتباه است ...";
                    Vue.toasted.error(msg);
                    return;
                }
                dispatch("handleAxiosError", error);
            });
    },
    addDataToAxiosAndLocalStorage(store, data) {
        const day = 60 * 60 * 1000 * 24; //* 24 hours
        data.expire = new Date().getTime() + day;
        localStorage.setItem("sjufNEbjDmE", JSON.stringify(data)); //* sjufNEbjDmE = userData
        localStorage.setItem("kemskDJobjgR", data.accessToken); //* kemskDJobjgR = access key
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
    },
};
