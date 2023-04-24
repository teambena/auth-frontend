import { defineStore } from "pinia";

export const useAppStore = defineStore("appstore", {
    state: () => ({
        leftDrawer: true,
        pageErrors: [],
        imageDialog: {
            showDialog: false,
            currentSlide: 1,
            images: [],
        },
        fullScreenLoading: false,
    }),
    actions: {
        openFullScreenLoading(value) {
            this.fullScreenLoading = true;
        },
        openImageDialog(payload) {
            this.imageDialog.images = payload.images;
            this.imageDialog.currentSlide = payload.currentSlide;
            this.imageDialog.showDialog = true;
        },
        closeDialogs() {
            this.imageDialog.showDialog = false;
            this.fullScreenLoading = false;
        },
        closeImageDialog() {
            this.imageDialog.showDialog = false;
        },
        showPageErrors(errors) {
            this.pageErrors = errors;
        },
    },
});
