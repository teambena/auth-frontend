<template>
    <q-layout view="hHh LpR lfr">
        <template v-if="$auth.isLoggedIn">
        </template>
        <template v-else>
            <q-header elevated>
                <q-toolbar class="glossy"> </q-toolbar>
            </q-header>
        </template>

        <!-- App layout container -->
        <q-page-container>
            <router-view />
        </q-page-container>

        <!-- request error dialog -->
        <q-dialog v-model="errorDialog" position="top">
            <q-card style="min-width: 300px; max-width: 95vw">
                <q-card-section class="row items-center align-start">
                    <q-avatar
                        text-color="negative"
                        size="40px"
                        font-size="36px"
                        icon="error"
                    ></q-avatar>
                    <div class="q-ml-sm">
                        <div class="text-weight-bold text-negative">
                            Unable to complete request.
                        </div>
                        <q-separator class="q-my-sm" />
                        <div
                            class="text-capitalize"
                            v-for="(msg, index) in pageErrors"
                            :key="index"
                        >
                            {{ msg }}
                        </div>
                    </div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-layout>
</template>
<script setup>
import { toRefs, computed } from "vue";
import { useQuasar } from "quasar";
import { useAuth } from "src/composables/auth";
import { useAppStore } from "src/stores/app";

import { ApiService } from "src/services/api";

const $q = useQuasar();
const auth = useAuth();
const store = useAppStore();

const { leftDrawer, pageErrors } = toRefs(store);

const errorDialog = computed({
    get() {
        return pageErrors.value.length > 0;
    },
    set(newValue) {
        pageErrors.value = [];
    },
});

function startLogout() {
    auth.logout();
    location.href = "/"; //reload page and navigate to index page
}

function initAxioInterceptors() {
    // Add a request interceptor
    ApiService.axios().interceptors.request.use(
        (config) => {
            //before new request, hide previous error message
            pageErrors.value = [];
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );
}
initAxioInterceptors();

leftDrawer.value = $q.platform.is.desktop;
initAxioInterceptors();
</script>

<style></style>
<style lang="scss">
.q-item.q-router-link--active,
.q-item--active {
    background-color: grey-1;
}
.q-item.q-router-link--active .q-icon,
.q-item--active .q-icon {
}
</style>
