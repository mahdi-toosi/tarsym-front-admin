<template>
    <div class="content usersPage">
        <header>
            <Modal name="user_edit_stage" dir="ltr" height="370" width="480px">
                <UserEditStage />
            </Modal>

            <button
                class="btn btn-green"
                @click="showEditStage({ createMode: true })"
            >
                <i class="fas fa-plus"></i>
                ساخت کاربر
            </button>
        </header>

        <table>
            <tbody>
                <tr>
                    <th>نام</th>
                    <th>نام کاربری</th>
                    <th>کد ملی</th>
                    <th>نقش</th>
                    <th>عملیات</th>
                </tr>
                <tr
                    v-for="user in users.data"
                    :key="user._id"
                    :class="{
                        suspended: user.role === 1,
                        drawerRequest: user.nationalCode && user.role === 3,
                    }"
                >
                    <td class="name" v-text="user.name"></td>
                    <td class="name" v-text="user.username"></td>
                    <td class="name" v-text="user.nationalCode"></td>
                    <td class="role">
                        {{ userRoles[user.role] }}
                    </td>
                    <td class="edit">
                        <i
                            class="far fa-edit"
                            @click="showEditStage({ user, createMode: false })"
                        ></i>
                    </td>
                </tr>
            </tbody>
        </table>

        <button
            @click="$store.dispatch('loadMore')"
            class="btn btn-blue loadMore"
            dir="ltr"
            v-if="users.total > users.data.length"
        >
            Load more ...
        </button>
    </div>
</template>

<script>
import UserEditStage from "@/components/userEditStage";

export default {
    name: "usersTable",
    computed: {
        users() {
            return this.$store.state.users;
        },
        userRoles() {
            return this.$store.state.userRoles;
        },
    },
    components: {
        UserEditStage,
    },
    methods: {
        showEditStage({ user, createMode }) {
            const emptyUser = {
                name: "",
                role: { key: 3, label: "کاربر" },
                username: "",
                password: "",
                rpassword: "",
            };
            const data = { createMode };

            if (createMode) data.user = emptyUser;
            else data.user = { ...user };

            this.$store.commit("ADD_USER_EDIT_STAGE_DATA", data);

            this.$modal.show("user_edit_stage");
        },
        clear_users() {
            this.$store.commit("CLEAR_USERS_STATE");
        },
    },
    watch: {
        // call again the method if the route changes
        $route: "clear_users",
    },
    destroyed() {
        this.$store.commit("CLEAR_USERS_STATE");
    },
};
</script>