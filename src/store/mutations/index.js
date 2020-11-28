import router from "../../router";

export default {
    LOGOUT(state, redirect) {
        localStorage.removeItem("sjufNEbjDmE"); // sjufNEbjDmE = userData
        localStorage.removeItem("kemskDJobjgR"); // kemskDJobjgR = access key
        state.user = {};
        router.push({ path: "/login", query: { redirect } });
    },
    SET_USER(state, user) {
        state.user = user;
    },
    SET_USER_ACCESS_TOKEN(state, token) {
        if (state.user) state.user.accessToken = token;
    },
    SET_DATA(state, { data, url }) {
        const key = url === "/documents" ? "docs" : "users";
        const docs = state[key];
        docs.data = docs.data.concat(data.data);
        docs.total = data.total;
        docs.skip = data.skip;
    },
    SET_LAST_REQUEST(state, req) {
        state.lastQuery = req;
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
    ADD_USER_EDIT_STAGE_DATA(state, data) {
        state.userEditStage = data;
    },
    ADD_UPDATED_USER(state, user) {
        const users = state.users.data;
        const user_index = users.findIndex((u) => u._id === user._id);
        users[user_index] = user;
        state.users.data = [...users];
    },
    ADD_NEW_USER(state, user) {
        state.users.data.unshift(user);
    },
    REMOVE_USER(state, _id) {
        const users = state.users.data;
        const user_index = users.findIndex((user) => user._id === _id);
        users.splice(user_index, 1);
    },
    CLEAR_USERS_STATE(state) {
        state.users = {
            data: [],
            skip: 0,
            total: 0,
        };
    },
};
