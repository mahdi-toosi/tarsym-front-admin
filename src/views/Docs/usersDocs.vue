<template>
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>{{ docs.total }} #</th>
                    <th>عنوان داکیومنت</th>
                    <th>دسته بندی</th>
                    <th>وضعیت</th>
                    <th>کاربر</th>
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
                            :options="situationOptions"
                            :value="doc.situation"
                            :clearable="false"
                            :searchable="false"
                            @input="
                                changeSituaion({ $event, _id: doc._id, index })
                            "
                        />
                    </td>
                    <td>{{ doc.user.username }}</td>
                    <td>{{ doc.updatedAt | formatDate }}</td>
                    <td class="options">
                        <a
                            @click="read_it(doc._id, doc.read, index)"
                            class="read"
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
                        <a @click="copyThisDocForAdmin(doc._id)" class="copy">
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
import mixins from "./mixins";
export default {
    name: "usersDocs",
    mixins: [mixins],
    data() {
        return {};
    },
    computed: {
        docs() {
            return this.$store.state.docs;
        },
    },
    methods: {
        async copyThisDocForAdmin(_id) {
            await this.$axios
                .post("/administrator/copyDoc", { _id })
                .then()
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
    },
    destroyed() {
        this.$store.commit("CLEAR_DOCS");
    },
};
</script>
