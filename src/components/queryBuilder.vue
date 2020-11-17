<template>
    <div dir="rtl" class="query-builder">
        <div class="options">
            <label for="title">title</label>
            <input type="text" v-model="options.title" class="titleInput" />

            <label for="username" style="margin-top: 10px">username</label>
            <input
                type="text"
                v-model="options['user.username']"
                class="titleInput"
            />

            <div>
                <label for="category">category</label>
                <v-select
                    id="category"
                    v-model="options.categories"
                    push-tags
                    taggable
                    multiple
                    dir="rtl"
                />
            </div>

            <div>
                <label for="tag">tag</label>
                <v-select
                    id="tag"
                    v-model="options.tags"
                    push-tags
                    taggable
                    multiple
                    dir="rtl"
                />
            </div>
            <div>
                <label for="situation">situation</label>
                <v-select
                    id="situation"
                    :options="$store.state.situationOptions"
                    v-model="options.situation"
                    :searchable="false"
                    push-tags
                    multiple
                    dir="rtl"
                />
            </div>
            <ul>
                <li>
                    <label for="star">star</label>
                    <VueSlider
                        v-model="options.star"
                        :data="data"
                        :marks="true"
                    />
                </li>

                <li v-if="$route.matched[0].name === 'usersDocsPage'">
                    <label for="read">read</label>
                    <VueSlider
                        v-model="options.read"
                        :data="data"
                        :marks="true"
                    />
                </li>
            </ul>
        </div>
        <div class="actions">
            <button class="btn btn-green" @click="getDocs()">درخواست</button>

            <button class="btn btn-red" @click="$modal.hide('query-builder')">
                بستن
            </button>
        </div>
    </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
    name: "queryBuilder",
    data() {
        return {
            options: {
                title: undefined,
                situation: [],
                categories: [],
                tags: [],
                "user.username": undefined,
            },
            data: ["none", "false", "true"],
        };
    },
    methods: {
        async getDocs() {
            const query = this.buildQuery();
            await this.$store.commit("CLEAR_DOCS");
            await this.$store.dispatch("getDocs", query);
            this.$modal.hide("query-builder");
        },
        buildQuery() {
            const o = { ...this.options };
            // clean query
            if (!o.title) delete o.title;
            if (!o["user[username]"]) delete o["user[username]"];
            if (!o.situation.length) delete o.situation;
            if (!o.categories.length) delete o.categories;
            if (!o.tags.length) delete o.tags;
            if (o.read === "none") delete o.read;
            if (o.star === "none") delete o.star;
            if (this.$route.name === "adminDocsPage") delete o.read;
            // add base options to query and return
            const baseQuery = {
                $select: [
                    "_id",
                    "title",
                    "user",
                    "situation",
                    "copiedFrom",
                    "star",
                    "read",
                    "categories",
                    "updatedAt",
                ],
                $limit: 20,
                $skip: 0,
                root: true,
                "$sort[updatedAt]": -1,
            };
            return { ...o, ...baseQuery };
        },
    },
    components: {
        VueSlider,
    },
    created() {
        const RN = this.$route.matched[0].name;
        if (RN === "usersDocsPage") this.options.vitrine = false;
        else if (RN === "adminDocsPage") this.options.vitrine = true;
    },
};
</script>

<style>
</style>