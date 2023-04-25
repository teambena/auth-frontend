<template>
    <main class="main-page" id="">
        <template v-if="pageReady">
            <section class="page-section " >
                <div class="container">
                    <div class="row q-col-gutter-x-md">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="relative-position" style="min-height:100px">
                                    <div>
                                        <q-card class="q-pa-lg q-my-md nice-shadow-16">
                                            <div class="row q-col-gutter-lg">
                                                <div class="col-auto">
                                                    <image-viewer :ratio="1/1" image-size="medium" :src="$auth.userPhoto"></image-viewer>
                                                </div>
                                                <div class="col">
                                                    <div class="text-h5 text-bold text-primary text-capitalize"> {{ $auth.userName }} </div>
                                                </div>
                                            </div>
                                        </q-card>
                                        <div class="row q-col-gutter-md">
                                            <div class="col-sm-3 col-12">
                                                <q-card   :flat="isSubPage" class="nice-shadow-16">
                                                    <q-tabs vertical class="text-primary" v-model="tab" no-caps inline-label>
                                                        <q-tab name="accountview" icon="account_box" label="Account Detail" style="justify-content:initial" />
                                                        <q-tab name="accountedit" icon="edit" label="Edit Account" style="justify-content:initial" />
                                                    </q-tabs>
                                                </q-card>
                                            </div>
                                            <dsiv class="col-sm-9 col-12">
                                            <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
                                                <q-tab-panel name="accountview">
                                                    <div class="row q-col-gutter-md justify-start">
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Id</div>
                                                                        <div class="text-bold">{{ item.id }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Username</div>
                                                                        <div class="text-bold">{{ item.username }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Firstname</div>
                                                                        <div class="text-bold">{{ item.firstname }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Lastname</div>
                                                                        <div class="text-bold">{{ item.lastname }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                    </div>
                                                </q-tab-panel>
                                                <q-tab-panel name="accountedit">
                                                    <div class="reset-grid">
                                                        <account-edit-page is-sub-page></account-edit-page>
                                                        </div>
                                                    </q-tab-panel>
                                                </q-tab-panels>
                                                </dsiv>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
            <template v-if="loading">
                <div style="min-height:200px" class="q-pa-sm text-center relative-position">
                    <q-inner-loading color="primary" label="Loading..." showing></q-inner-loading>
                </div>
            </template>
        </main>
</template>
<script setup>
	import {  ref, toRefs } from 'vue';
	import { useMeta } from 'quasar';
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
	import { useViewPage } from 'src/composables/viewpage.js';
	import { usePageStore } from 'src/stores/page';

	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'id',
		},
		pageStoreKey: {
			type: String,
			default: 'ACCOUNT',
		},
		pageName: {
			type: String,
			default: 'user',
		},
		routeName: {
			type: String,
			default: 'useraccountview',
		},
		apiPath: {
			type: String,
			default: 'account',
		},
		editButton: {
			type: Boolean,
			default: true,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});

	const store = usePageStore(props.pageStoreKey);
	const page = useViewPage({ store, props });

	const { currentRecord } = toRefs(store.state);
	const { pageReady } = toRefs(page.state);
	const item = currentRecord;

	const tab = ref('accountview');

	useMeta(() => {
		return {
			//set browser title
			title: "My Account"
		}
	});
</script>
<style scoped>
</style>
