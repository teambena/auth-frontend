import { useAppStore } from "src/stores/app";
import { useRoute, useRouter } from "vue-router";

import { useQuasar } from "quasar";
export function useApp() {
    const store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    function openImageDialog(pageData) {
        store.openImageDialog(pageData);
    }

    function openFullScreenLoading(msg) {
        store.openFullScreenLoading(msg);
    }

    function openPageDrawer(pageData) {
        store.openPageDrawer(pageData);
    }

    function closeDialogs() {
        store.closeDialogs();
    }

    function setPageTitle(pageName, title) {
        if (pageName == route.name && title) {
            document.title = title;
        }
    }

    function flashMsg(
        title,
        detail = null,
        type = "positive",
        position = "top"
    ) {
        if (title) {
            $q.notify({
                message: title,
                caption: detail,
                position,
                type,
                timeout: 3000,
            });
        }
    }

    function navigateTo(path) {
        if (path && route.path !== path) {
            router.push(path);
        }
    }

    function showPageRequestError(error) {
        console.error(error);
        const xhrRequest = error?.request;
        const defaultMsg = "Error processing request!"; // if error is not a api request error.
        let errorMsgs = [defaultMsg];
        if (xhrRequest) {
            let errorData = xhrRequest.response;
            if (typeof errorData === "string") {
                try {
                    // if error message is valid json data
                    errorData = JSON.parse(errorData);
                } catch (ex) {
                    //not a valid json. Display as simple message
                    //console.error(ex);
                }
            }
            if (Array.isArray(errorData)) {
                errorMsgs = errorData;
            } else if (typeof errorData === "object") {
                errorMsgs = Object.values(errorData);
            } else {
                errorMsgs = [errorData.toString()];
            }
        }
        store.showPageErrors(errorMsgs);
        if (xhrRequest?.status == 401) {
            //token might have expired
            //logout user and navigate to login page
            //startLogOut();
            location.href = "/";
        }
    }

    return {
        openFullScreenLoading,
        openImageDialog,
        openPageDrawer,
        closeDialogs,
        setPageTitle,
        flashMsg,
        navigateTo,
        showPageRequestError,
    };
}
