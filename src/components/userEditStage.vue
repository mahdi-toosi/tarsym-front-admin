<template>
    <form
        class="userEditStage"
        @submit.prevent="createMode ? createUser() : updateUser()"
    >
        <div class="profileAvatar">
            <img
                class="profile-pic"
                :src="avatar || '/imgs/profileAvatar.png'"
            />
            <div class="image_input">
                <i class="fa fa-camera" @click="$refs.avatarInput.click()"></i>
                <input
                    class="file-upload"
                    type="file"
                    ref="avatarInput"
                    accept="image/png,image/jpg,image/jpeg"
                    @change="uploadAvatar"
                />
            </div>
        </div>

        <div class="rightColumn">
            <div>
                <label for="name">نام و نام خانوادگی</label>
                <input type="text" id="name" v-model="user.name" />
            </div>

            <div>
                <label for="username">نام کاربری</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    v-model="user.username"
                />
            </div>

            <div>
                <label for="nationalCode">کد ملی</label>
                <input
                    type="text"
                    id="nationalCode"
                    v-model="user.nationalCode"
                />
            </div>

            <div>
                <label for="city">شهر</label>
                <input type="text" id="city" v-model="user.city" />
            </div>

            <div>
                <p v-if="!createMode">
                    تاریخ عضویت:
                    <span>{{ user.createdAt | formatDate }}</span>
                </p>
            </div>
        </div>

        <div class="leftColumn">
            <div v-if="createMode">
                <label for="password" v-if="createMode"> رمز عبور </label>
                <input type="password" id="password" v-model="user.password" />
            </div>

            <div v-if="createMode">
                <label for="rpassword" v-if="createMode">
                    تکرار رمز عبور
                </label>
                <input
                    type="password"
                    id="rpassword"
                    v-model="user.rpassword"
                />
            </div>

            <div>
                <label for="job">شغل</label>
                <input type="text" id="job" v-model="user.job" />
            </div>
            <div>
                <label for="job">موبایل</label>
                <input type="text" id="job" v-model="user.mobile" />
            </div>

            <div>
                <v-select
                    :options="editStageRoles"
                    v-model="user.role"
                    placeholder="نقش"
                    class="roles"
                    dir="rtl"
                    :searchable="false"
                    v-if="!createMode"
                />
                <p v-else>نقش : <strong>کاربر</strong></p>
            </div>

            <div class="actions">
                <button class="btn btn-green" type="submit">ذخیره</button>

                <button
                    class="btn btn-red"
                    v-if="!createMode"
                    @click="deleteUser()"
                >
                    حذف کاربر
                </button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: "userEditStages",
    data() {
        return {
            createMode: false,
            user: {},
        };
    },
    methods: {
        async updateUser() {
            const user = this.trimUserData();
            user.role = user.role.key;
            delete user.password;
            if (!this.validateUser(user)) return false;

            await this.$axios
                .patch(`/users/${user._id}`, user)
                .then(({ data }) =>
                    this.$store.commit("ADD_UPDATED_USER", data)
                )
                .catch((error) =>
                    this.$store.dispatch("handleAxiosError", error)
                );

            this.$modal.hide("user_edit_stage");
        },
        async createUser() {
            const newUser = this.trimUserData();
            delete newUser.role;
            if (!this.validateUser(newUser)) return false;

            await this.$axios
                .post("/users", newUser)
                .then(({ data }) => this.$store.commit("ADD_NEW_USER", data))
                .catch((error) => console.log({ error }));

            this.$modal.hide("user_edit_stage");
        },
        trimUserData() {
            const user = this.user;
            for (const key in user) {
                if (typeof user[key] === "string") user[key] = user[key].trim();
            }
            return user;
        },
        validateUser(user) {
            const errors = [];
            if (user.name.length < 5)
                errors.push("نام و نام خانوادگی کمتر از 6 کاراکتر است");
            if (user.username.length < 5)
                errors.push("نام کاربری کمتر از 6 کاراکتر است");
            if (user.nationalCode && user.nationalCode.length < 10)
                errors.push("کد ملی نامعتبر است");
            if (user.password) {
                if (user.password.length < 5)
                    errors.push("رمز عبور کمتر از 6 کاراکتر است");
                if (user.password != user.rpassword)
                    errors.push("تکرار رمز عبور صحیح نیست");
            }

            if (!errors.length) return true;

            errors.forEach((error) => {
                this.$toasted.error(error);
            });
            return false;
        },
        async deleteUser() {
            const sure = confirm("مطمئنید که میخواهید این یوزر را حذف کنید ؟");
            if (!sure) return;

            await this.$axios
                .delete(`/users/${this.user._id}`)
                .then(() => this.$store.commit("REMOVE_USER", this.user._id))
                .catch((error) => console.log({ error }));

            this.$modal.hide("user_edit_stage");
        },
        async uploadAvatar(event) {
            const avatar = event.target.files[0];
            if (!avatar) return;
            if (avatar.size > 2e5) {
                this.$toasted.error("حجم آواتار حداکثر 200kb میتواند باشد");
                return;
            }
            // create form data
            const fd = new FormData();
            // just add file instance to form data normally
            fd.append("avatar", avatar);

            await this.$axios
                .post("/uploadAvatarImage", fd, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(({ data }) => this.storeUserData({ avatar: data.url }))
                .catch(() => {
                    this.$toasted.error(
                        "آپلود عکس با مشکل روبرو شده. لطفا دوباره امتحان کنید ..."
                    );
                    return false;
                });
            // clear input value to make selecting the same image work
            event.target.value = "";
        },
    },
    computed: {
        avatar() {
            const avatar = this.user.avatar;
            if (!avatar) return false;
            if (process.env.NODE_ENV === "production") return avatar;
            return process.env.VUE_APP_DOMAIN + avatar;
        },
        editStageRoles() {
            const roles = this.$store.state.userRoles;
            const rolesAsArray = [];
            for (const key in roles) {
                const obj = {};
                obj["key"] = Number(key);
                obj["label"] = roles[key];
                rolesAsArray.push(obj);
            }
            return rolesAsArray;
        },
    },
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        },
    },
    created() {
        this.user = this.$store.state.userEditStage.user;
        const user_role = this.editStageRoles.filter(
            (el) => el.key === this.user.role
        );
        this.user.role = user_role;

        this.createMode = this.$store.state.userEditStage.createMode;
    },
    destroyed() {
        this.$store.state.userEditStage = {};
    },
};
</script>

<style lang="scss">
.profileAvatar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: -10px;
    img {
        width: 90px;
        height: 90px;
        overflow: hidden;
        border-radius: 90px;
        border: 5px solid gainsboro;
    }

    .image_input {
        position: absolute;
        right: 15%;
        bottom: 0px;
        cursor: pointer;

        .file-upload {
            display: none;
        }
    }
}
</style>