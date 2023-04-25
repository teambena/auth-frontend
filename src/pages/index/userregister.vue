<template>
    <main class="main-page" id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section q-pa-md q-mb-md" >
                    <div class="container">
                        <div class="row items-center q-col-gutter-md">
                            <div  v-if="!isSubPage"  class="col-auto " >
                                <q-btn @click="$router.go(-1)"      flat :rounded="false"  size=""  color="primary"  no-caps  unelevated   class="" >
                                    <q-icon name="arrow_back"></q-icon>
                                </q-btn>
                            </div>
                            <div  class="col-md-auto " >
                                <div class=" text-h6 text-primary" >
                                    User registration
                                </div>
                            </div>
                            <div  class="col-md-4 col-12 comp-grid" >
                                <div class="">
                                    <div>
                                        Already have an account?
                                        <q-btn     :rounded="false"  no-caps  unelevated    color="accent" icon="account_box" to="/"> Login</q-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="row q-col-gutter-x-md">
                        <div  class="col-md-9 col-12 comp-grid" >
                            <div >
                                <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-16">
                                    <q-form ref="observer" @submit.prevent="submitForm()">
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Username *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <check-duplicate error-msg="Not available" v-model="formData.username" check-path="components_data/user_username_exist/" v-slot="checker">
                                                    <q-input   ref="ctrlusername" @blur="checker.check" :loading="checker.loading" v-model.trim="formData.username"  label="Username" type="text" placeholder="Enter Username"
                                                    class="" :error="isFieldValid('username') || checker.alreadyExist" :error-message="getFieldError('username') || checker.errorMsg">
                                                    </q-input>
                                                    </check-duplicate>
                                                </div>
                                            </div>
                                        </div>
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
                                                    Password *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlpassword" v-model="formData.password"  label="Password" :type="isPwd ? 'password' : 'text'" placeholder="Enter Password"
                                                    class="" :error="isFieldValid('password')" :error-message="getFieldError('password')">
                                                    <template v-slot:append>
                                                        <q-icon
                                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                                        class="cursor-pointer"
                                                        @click="isPwd = !isPwd"
                                                        />
                                                    </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Confirm Password *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrlconfirmpassword" v-model="formData.confirm_password" :type="isCPwd ? 'password' : 'text'" label="Confirm Password" placeholder="Confirm Password"  :error="isFieldValid('confirm_password')" :error-message="getFieldError('confirm_password')">
                                                    <template v-slot:append>
                                                        <q-icon
                                                        :name="isCPwd ? 'visibility_off' : 'visibility'"
                                                        class="cursor-pointer"
                                                        @click="isCPwd = !isCPwd"
                                                        />
                                                    </template>
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
                                                        <q-uploader-input :max-files="1" :max-file-size="5" accept=".jpg,.png,.bmp,.jpeg" :multiple="false" delete-icon="clear" style="width:100%" label="Choose files or drop files here" upload-path="fileuploader/upload/profile_image" v-model="formData.profile_image"></q-uploader-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    </main>
</template>
<script setup>
	import {  computed, ref, reactive, toRefs } from 'vue';
	import { required, sameAs, minLength, maxLength, regex} from 'src/services/validators';
	import { usePageStore } from 'src/stores/page';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { useAuth } from 'src/composables/auth';
	import { useAddPage } from 'src/composables/addpage';

	const props = defineProps({
		pageName : {
			type : String,
			default : 'user',
		},
		pageStoreKey: {
			type: String,
			default: 'REGISTER',
		},
		routeName : {
			type : String,
			default : 'useruserregister',
		},
		apiPath : {
			type : String,
			default : 'auth/register',
		},
		submitButtonLabel: {
			type: String,
			default: "Submit",
		},
		formValidationError: {
			type: String,
			default: "Form is invalid",
		},
		formValidationMsg: {
			type: String,
			default: "Please complete the form",
		},
		msgTitle: {
			type: String,
			default: "Create Record",
		},
		msgAfterSave: {
			type: String,
			default: "Record added successfully",
		},
		msgBeforeSave: {
			type: String,
			default: "",
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
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => {}
		},
	});
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();// application state and methods
	const auth = useAuth();

	const formDefaultValues = {
		username: "",
		firstname: "",
		lastname: "",
		password: "",
		confirm_password: "",
		profile_image: "",
	};

	const formData = reactive({ ...formDefaultValues });

	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			username: { required, minLength: minLength(4), maxLength: maxLength(16), regex: regex(/^[A-Za-z0-9_]+$/), },
		    firstname: { required },
		    password: { required },
		    confirm_password: {required, sameAs: sameAs(formData.password, 'Password') },
		    profile_image: { required }
		}
	});

	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });// page form hook

	//event raised before form submit
	function beforeSubmit(){
		return true;
	}
	//event raised after form submit
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); //reset form data
		const loginData = response;
		// user registration completed. navigation to home page
		if (loginData.token) {
			auth.saveLoginData(loginData, false);
			location.href = "/";
		}
		else{
			app.flashMsg(loginData.message); //show flashMsg if available
			app.navigateTo(loginData.nextpage);// navigate to next page if available
		}
	}

	const {  saving, pageReady, isPwd, isCPwd, } = toRefs(page.state);

	const { submitForm, isFieldValid, getFieldError, mapOptionField } = page.methods;

	useMeta(() => {
		return {
			//set browser title
			title: "Add New User"
		}
	});

	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
