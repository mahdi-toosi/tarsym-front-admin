<template>
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>عنوان داکیومنت</th>
                    <th>دسته بندی</th>
                    <th>وضعیت انتشار</th>
                    <th>وضعیت در ویترین</th>
                    <th>تاریخ کپی</th>
                    <th>آخرین بروزرسانی</th>
                    <th>مالک اولیه</th>
                    <th>عملیات</th>
                    <th>تاریخ انتشار</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(doc, index) in docs.data" :key="doc._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ doc.title }}</td>
                    <td>{{ doc.categories }}</td>
                    <td><Checkbox :isChecked="false" /></td>
                    <td><Checkbox :isChecked="false" /></td>
                    <td></td>
                    <td>{{ doc.updatedAt | formatDate }}</td>
                    <td></td>
                    <td class="options">
                        <a
                            :href="
                                `https://www.dev.tarsym.ir/update/${doc._id}`
                            "
                            target="_blank"
                            ><i class="far fa-edit"></i
                        ></a>
                        <a><i class="far fa-trash-alt"></i></a>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <!-- <button class="btn btn-blue" dir="ltr">
            Load more ...
        </button> -->
    </div>
</template>

<script>
import Checkbox from "@/components/checkbox";
export default {
    name: "adminDocs",
    data() {
        return { docs: [] };
    },
    components: { Checkbox },
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        }
    },
    methods: {
        async getDocs() {
            const url = "/documents";
            const options = {
                params: {
                    root: true,
                    $skip: 0
                }
            };
            const docs = await this.$axios
                .get(url, options)
                .then(res => {
                    if (res.status == 200) return res.data;
                })
                .catch(error => {
                    this.$store.dispatch("handleAxiosError", error);
                });
            if (!docs) return;

            // const decoded_docs = await this.$store.dispatch("decode_the_docs", {
            //     docs
            // });
            // docs.data = decoded_docs;
            this.docs = docs;
        }
    },
    created() {
        console.log("created");
        this.getDocs();
    }
};
</script>

<style lang="scss" scoped>
button {
    border-radius: 99px;
    margin: 1rem auto;
    display: block;
}
</style>