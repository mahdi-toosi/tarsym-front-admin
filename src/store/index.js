import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        docs: { data: [], total: 0, skip: 0, $limit: 20 },
        lastQuery: {},
        situationOptions: ["public", "private", "trash", "draft"],
    },
    mutations,
    actions,
    getters: {
        isAuthenticated: (state) => state.user.username,
    },
    modules: {},
});
