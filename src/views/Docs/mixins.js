export default {
    data() {
        return {
            docs: { data: [], total: 0, skip: 0, $limit: 20 },
            situationOptions: ["public", "private", "trash", "draft"],
        };
    },
    methods: {
        loadMore() {
            const $skip = this.docs.data.length;
            this.getDocs({ $limit: 20, $skip });
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
        changeSituaion({ $event, _id, index }) {
            this.$axios
                .patch(`/documents/${_id}`, { situation: $event })
                .then(() => {
                    this.docs.data[index].situation = $event;
                    this.$toasted.info(`وضعیت داکیومنت به ${$event} تغییر کرد`);
                })
                .catch((error) => {
                    this.$store.dispatch("handleAxiosError", error);
                });
        },
        async getDocs({ $skip, vitrine, situation }) {
            const options = {
                params: {
                    vitrine,
                    situation,
                    $limit: this.docs.$limit,
                    $skip,
                    root: true,
                    "$sort[createdAt]": -1,
                    $select: ["_id", "title", "categories", "updatedAt", "user", "situation", "copiedFrom"],
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
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        },
    },
};
