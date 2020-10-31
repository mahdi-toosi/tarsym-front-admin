<template>
    <div class="auth">
        <div class="loginForm">
            <h1>ورود به ترسیم</h1>
            <form @submit.prevent="login()">
                <input
                    type="text"
                    placeholder="نام کاربری"
                    v-model="user.username"
                />
                <input
                    type="password"
                    placeholder="رمز عبور"
                    v-model="user.password"
                />
                <input class="btn btn-green" type="submit" value="ورود" />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginComponent",
    data() {
        return {
            user: { username: "", password: "" }
        };
    },
    methods: {
        async login() {
            if (!this.validateLoginForm()) return;
            this.$store.dispatch("login", this.user);
        },
        validateLoginForm() {
            const user = this.user;
            let errors = [];
            if (user.username.length < 5)
                errors.push("نام کاربری معتبر نمیباشد");
            if (user.password.length < 5) errors.push("رمز عبور معتبر نمیباشد");
            if (!errors.length) return true;
            else {
                errors.forEach(error => {
                    this.$toasted.error(error);
                });
                return false;
            }
        }
    }
};
</script>

<style lang="scss">
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 95vh;
    flex-direction: column;

    .loginForm {
        background: white;
        border-radius: 11px;
        width: 40%;
        text-align: center;
    }

    input,
    a,
    button {
        display: block;
        margin: 20px auto;
        text-align: left;
        border-radius: 3px;
        direction: ltr;
    }

    a {
        text-align: right;
    }

    input[type="text"],
    input[type="password"] {
        text-align: right;
        direction: rtl;
        border-radius: 0;
        background: transparent;
        border: none;
        border-bottom: 2px solid #cacaca;
        line-height: 1.5;
        padding: 3px 10px;
    }

    h1 {
        margin: 2.5rem;
    }
}
</style>