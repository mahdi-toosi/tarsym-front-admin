export default {
    data() {
        return { docs: { data: [], total: 0, skip: 0 } };
    },
    methods: {
        loadmore() {
            const $skip = this.docs.data.length;
            this.getDocs(20, $skip);
        },
        async deleteThisDoc(_id, index) {
            const areYouSure = confirm("بابت حدف این داکیومنت مطمئنید ؟");
            if (!areYouSure) return;

            const remove_childs = confirm("در صورتی که این داکیومنت دارای زیرمجموعه باشد آنها هم حذف میشوند");
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
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        },
    },
    created() {
        this.getDocs(20, 0);
    },
};
