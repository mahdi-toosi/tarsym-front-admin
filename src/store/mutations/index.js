import router from "../../router";

export default {
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
    SET_DOCS(state, data) {
        const docs = state.docs;
        docs.data = docs.data.concat(data.data);
        docs.total = data.total;
        docs.skip = data.skip;
    },
    SET_LAST_QUERY(state, options) {
        state.lastQuery = options;
    },
    REMOVE_DOC(state, index) {
        state.docs.data.splice(index, 1);
        --state.docs.total;
    },
    CHANGE_FLAG(state, { index, flag, value }) {
        state.docs.data[index][flag] = value;
    },
    CLEAR_DOCS(state) {
        state.docs = { data: [], total: 0, skip: 0, $limit: 20 };
        state.lastQuery = {};
    },
};
