<template>
  <div class="resetpassword q-pa-md">
    <div class="text-h5 text-bold">Password Reset</div>
    <q-form ref="observer" @submit.prevent="submitForm()">
      <div class="q-my-md">
        <q-input
          ref="ctrlpassword"
          v-model="formData.password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
          placeholder="Enter Password"
          class=""
          :error="isFieldValid('password')"
          :error-message="getFieldError('password')"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="q-my-md">
        <q-input
          ref="ctrlconfirmpassword"
          v-model="formData.confirm_password"
          :type="isCPwd ? 'password' : 'text'"
          label="Confirm Password"
          placeholder="Confirm Password"
          :error="isFieldValid('confirm_password')"
          :error-message="getFieldError('confirm_password')"
        >
          <template v-slot:append>
            <q-icon
              :name="isCPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isCPwd = !isCPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-md-3 col-sm-4">
        <q-btn
          :rounded="false"
          color="primary"
          no-caps
          unelevated
          type="submit"
          icon-right="send"
          :loading="saving"
        >
          <template v-slot:loading>
            <q-spinner-oval />
          </template>
          Change Password
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

  <script setup>
import { computed, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useMeta } from "quasar";
import {
  required,
  sameAs,
  minLength,
  noSequence,
} from "src/services/validators";
import { useApp } from "src/composables/app.js";
import { useForm } from "src/composables/formpage";
import { $t } from "src/services/i18n";
const props = defineProps({
  pageName: {
    type: String,
    default: "resetpassword",
  },
  routeName: {
    type: String,
    default: "resetpassword",
  },
  apiPath: {
    type: String,
    default: "auth/resetpassword",
  },
  formValidationError: {
    type: String,
    default: "Form is invalid",
  },
  formValidationMsg: {
    type: String,
    default: "Please complete the form",
  },
});
const app = useApp();
const route = useRoute();
const formDefaultValues = {
  password: "",
  confirm_password: "",
  token: route.query.token,
  email: route.query.email,
};
const formData = reactive({ ...formDefaultValues });
// redirect to another page
function afterSubmit(response) {
  app.navigateTo("/account");
}
//form validation rules
const rules = computed(() => {
  return {
    password: {
      required,
      minLength: minLength(6),
      noSequence: noSequence(
        /^(?!.*(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx)).*$/
      ),
    },
    confirm_password: {
      required,
      sameAs: sameAs(formData.password, "Password"),
    },
  };
});
const page = useForm({ props, formData, rules, afterSubmit });
const { saving, isPwd, isCPwd, } = toRefs(page.state);
const { submitForm, getFieldError, isFieldValid } = page;
useMeta(() => {
  return {
    //set browser title
    title: "Reset Password",
  };
});
</script>
