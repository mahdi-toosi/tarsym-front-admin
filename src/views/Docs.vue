<template>
    <div class="content">
        <Modal name="query-builder" dir="ltr" height="375">
            <QueryBuilder />
        </Modal>

        <button
            class="btn btn-green"
            style="margin-bottom: 15px"
            @click="$modal.show('query-builder')"
        >
            ساخت کوئری
        </button>

        <table>
            <thead>
                <tr>
                    <th>{{ docs.total }} #</th>
                    <th>عنوان داکیومنت</th>
                    <th>دسته بندی</th>
                    <th>وضعیت</th>
                    <th>
                        {{ isUsersDocs ? "کاربر" : "مالک اولیه" }}
                    </th>
                    <th>بروزرسانی</th>
                    <th>عملیات</th>
                </tr>
            </thead>
            <tbody name="orderupList" is="transition-group">
                <tr v-for="(doc, index) in docs.data" :key="doc._id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <a
                            :href="`https://www.dev.tarsym.ir/read/${doc._id}`"
                            target="_blank"
                        >
                            {{ doc.title }}
                        </a>
                    </td>
                    <td class="categories">
                        <span
                            v-for="(cat, index) in doc.categories"
                            :key="index"
                            v-text="cat"
                        >
                        </span>
                    </td>
                    <td>
                        <v-select
                            :options="$store.state.situationOptions"
                            :value="doc.situation"
                            :clearable="false"
                            :searchable="false"
                            @input="
                                changeSituaion({ $event, _id: doc._id, index })
                            "
                        />
                    </td>
                    <td>
                        {{ doc.user.username }}
                    </td>
                    <td>{{ doc.updatedAt | formatDate }}</td>
                    <td class="options">
                        <a
                            @click="read_it(doc._id, doc.read, index)"
                            class="read"
                            v-if="isUsersDocs"
                        >
                            <i
                                class="fas"
                                :class="
                                    doc.read ? 'fa-check-double' : 'fa-check'
                                "
                            ></i>
                        </a>
                        <a
                            @click="addStar(doc._id, doc.star, index)"
                            class="star"
                        >
                            <i
                                class="fa-star"
                                :class="doc.star ? 'fas' : 'far'"
                            ></i>
                        </a>
                        <a
                            @click="copyThisDocForAdmin(doc._id)"
                            class="copy"
                            v-if="isUsersDocs"
                        >
                            <i class="far fa-copy"></i>
                        </a>
                        <a
                            :href="`https://www.dev.tarsym.ir/update/${doc._id}`"
                            target="_blank"
                            class="update"
                        >
                            <i class="far fa-edit"></i>
                        </a>
                        <a
                            @click="deleteThisDoc(doc._id, index)"
                            class="delete"
                        >
                            <i class="far fa-trash-alt"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <button
            @click="$store.dispatch('loadMore')"
            class="btn btn-blue loadMore"
            dir="ltr"
            v-if="docs.total > docs.data.length"
        >
            Load more ...
        </button>
    </div>
</template>

<script>
import QueryBuilder from "@/components/queryBuilder";

export default {
    name: "Docs",
    components: { QueryBuilder },
    methods: {
        async copyThisDocForAdmin(_id) {
            await this.$axios
                .post("/administrator/copyDoc", { _id })
                .then(() => {
                    this.$toasted.info("داکیومنت برای ادمین کپی شد");
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
        read_it(_id, read, index) {
            this.$axios
                .patch(`/documents/${_id}`, { read: !read })
                .then(() => {
                    this.$store.commit("REMOVE_DOC", index);
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
        async deleteThisDoc(_id, index) {
            const areYouSure = confirm("بابت حدف این داکیومنت مطمئنید ؟");
            if (!areYouSure) return;

            const remove_childs = confirm(
                "در صورتی که این داکیومنت دارای زیرمجموعه باشد آنها هم حذف میشوند"
            );
            if (!remove_childs) return;

            await this.$axios
                .delete(`/documents/${_id}`)
                .then(() => {
                    this.$store.commit("REMOVE_DOC", index);
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
        changeSituaion({ $event, _id, index }) {
            this.$axios
                .patch(`/documents/${_id}`, { situation: $event })
                .then(() => {
                    this.$store.commit("CHANGE_FLAG", {
                        index,
                        flag: "situation",
                        value: $event,
                    });
                    this.$toasted.info(`وضعیت داکیومنت به ${$event} تغییر کرد`);
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
        addStar(_id, star, index) {
            this.$axios
                .patch(`/documents/${_id}`, { star: !star })
                .then(() => {
                    this.$store.commit("CHANGE_FLAG", {
                        index,
                        flag: "star",
                        value: !star,
                    });
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
        clear_docs() {
            this.$store.commit("CLEAR_DOCS");
        },
    },
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        },
    },
    watch: {
        // call again the method if the route changes
        $route: "clear_docs",
    },
    destroyed() {
        this.clear_docs();
    },
    computed: {
        docs() {
            return this.$store.state.docs;
        },
        isUsersDocs() {
            return this.$route.matched[0].name === "usersDocsPage";
        },
    },
    created() {},
};
</script>
