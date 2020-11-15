<template>
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>{{ this.docs.total }} #</th>
                    <th>عنوان داکیومنت</th>
                    <th>دسته بندی</th>
                    <th>وضعیت</th>
                    <th>آخرین بروزرسانی</th>
                    <th>مالک اولیه</th>
                    <th>عملیات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(doc, index) in docs.data" :key="doc._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ doc.title }}</td>
                    <td class="categories">
                        <span
                            v-for="(doc, index) in doc.categories"
                            :key="index"
                        >
                            {{ doc }}
                        </span>
                    </td>
                    <td>{{ doc.situation }}</td>
                    <td>{{ doc.updatedAt | formatDate }}</td>
                    <td>{{ doc.copiedFrom.username }}</td>
                    <td class="options">
                        <a
                            :href="`https://www.dev.tarsym.ir/read/${doc._id}`"
                            target="_blank"
                            class="read"
                        >
                            <i class="far fa-eye"></i>
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
            @click="loadmore()"
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
    name: "adminDocs",
    mixins: [mixins],
    data() {
        return {};
    },
    methods: {
        async getDocs() {
            const options = {
                params: {
                    root: true,
                    vitrine: true,
                    "$sort[createdAt]": -1,
                    $select: [
                        "_id",
                        "title",
                        "categories",
                        "updatedAt",
                        "user",
                        "situation",
                        "copiedFrom",
                    ],
                },
            };
            await this.$axios
                .get("/documents", options)
                .then(({ data }) => {
                    this.docs.data = this.docs.data.concat(data.data);
                    this.docs.total = data.total;
                    this.docs.skip = data.skip;
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    border-radius: 99px;
    margin: 1rem auto;
    display: block;
}
</style>