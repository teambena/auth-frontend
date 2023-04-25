<template>
    <main class="main-page" id="">
        <template v-if="pageReady">
            <section class="page-section " >
                <div class="container">
                    <div class="row q-col-gutter-x-md">
                        <div  class="col-md-9 col-12 comp-grid" >
                            <div >
                                <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-16">
                                    <q-form ref="observer"  @submit.prevent="submitForm()">
                                    <!--[form-content-start]-->
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Firstname *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlfirstname" v-model.trim="formData.firstname"  label="Firstname" type="text" placeholder="Enter Firstname"
                                                    class="" :error="isFieldValid('firstname')" :error-message="getFieldError('firstname')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Lastname
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrllastname" v-model.trim="formData.lastname"  label="Lastname" type="text" placeholder="Enter Lastname"
                                                    class="" :error="isFieldValid('lastname')" :error-message="getFieldError('lastname')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Profile Image *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <div class="q-mb-sm">
                                                        <q-uploader-input show-uploaded-files :max-files="1" :max-file-size="5" accept=".jpg,.png,.bmp,.jpeg" :multiple="false" delete-icon="clear" style="width:100%" label="Choose files or drop files here" upload-path="fileuploader/upload/profile_image" v-model="formData.profile_image"  ></q-uploader-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--[form-content-end]-->
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" icon-right="send" :loading="saving">
                                            {{ submitButtonLabel }}
                                            <template v-slot:loading>
                                                <q-spinner-oval />
                                            </template>
                                        </q-btn>
                                    </div>
                                    </q-form>
                                    <slot :submit="submitForm" :saving="saving"></slot>
                                </q-card>
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
	import {  computed, reactive, toRefs } from 'vue';
	import { required, } from 'src/services/validators';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { useEditPage } from 'src/composables/editpage';
	import { usePageStore } from 'src/stores/page';

	const props = defineProps({
		id: [String, Number],
		pageName: {
			type: String,
			default: 'user',
		},
		pageStoreKey: {
			type: String,
			default: 'ACCOUNT',
		},
		routeName: {
			type: String,
			default: 'useraccountedit',
		},
		pagePath: {
			type : String,
			default : 'account/edit',
		},
		apiPath: {
			type: String,
			default: 'account/edit',
		},
		submitButtonLabel: {
			type: String,
			default: "Update",
		},
		msgTitle: {
			type: String,
			default: "Update Record",
		},
		msgBeforeSave: {
			type: String,
			default: "",
		},
		msgAfterSave: {
			type: String,
			default: "Record updated successfully",
		},
		formValidationError: {
			type: String,
			default: "Form is invalid",
		},
		formValidationMsg: {
			type: String,
			default: "Please complete the form",
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});

	const store = usePageStore(props.pageStoreKey);
	const app = useApp();

	const formDefaultValues = Object.assign({
		firstname: "",
		lastname: "",
		profile_image: "",
	}, props.pageData);

	const formData = reactive({ ...formDefaultValues });

	//event raised after form submit
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		location.reload();
	}

	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			firstname: { required },
		    profile_image: { required }
		}
	});

	const page = useEditPage({ store, props, formData, rules, afterSubmit });

	const {  pageReady,   } = toRefs(page.state);

	const { load, submitForm, isFieldValid, getFieldError,  } = page.methods;

	useMeta(() => {
		return {
			//set browser title
			title: "My Account"
		}
	});
</script>
<style scoped>
</style>
