import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        docs: { data: [], total: 0, skip: 0 },
        lastQuery: {},
        situationOptions: ["publish", "private", "trash", "draft"],
        userEditStage: {},
        userRoles: {
            3: "کاربر",
            35: "ترسیم کننده",
            36: "ترسیم کننده (با عکس)",
            37: "ترسیم کننده (با آیفریم)",
            38: "ترسیم کننده (با آیفریم و عکس)",
            48: "ادمین",
            1: "تعلیق شده",
        },
        users: {
            data: [],
            skip: 0,
            total: 0,
        },
    },
    mutations,
    actions,
    getters: {
        isAuthenticated: (state) => state.user.username,
    },
    modules: {},
});
