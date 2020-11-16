export default {
    data() {
        return {
            situationOptions: ["public", "private", "trash", "draft"],
        };
    },
    methods: {
        async deleteThisDoc(_id, index) {
            const areYouSure = confirm("بابت حدف این داکیومنت مطمئنید ؟");
            if (!areYouSure) return;

            const remove_childs = confirm("در صورتی که این داکیومنت دارای زیرمجموعه باشد آنها هم حذف میشوند");
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
                    this.$store.commit("CHANGE_FLAG", { index, flag: "situation", value: $event });
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
    },
    filters: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("fa-IR");
        },
    },
};
