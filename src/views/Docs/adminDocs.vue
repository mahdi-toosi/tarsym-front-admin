<template>
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>#</th>
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

        <!-- <button class="btn btn-blue" dir="ltr">
            Load more ...
        </button> -->
    </div>
</template>

<script>
export default {
    name: "adminDocs",
    data() {
        return { docs: [] };
    },
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        },
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
                .then((res) => (this.docs = res.data))
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
                    this.docs.data.splice(index, 1);
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
    },
    created() {
        this.getDocs();
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