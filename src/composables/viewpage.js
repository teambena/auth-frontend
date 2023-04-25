
import { computed, watch, reactive, onMounted } from "vue";
import { utils } from 'src/utils';
import { useApp } from 'src/composables/app';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export function useViewPage({ store, props }) {
	const app = useApp();
	const route = useRoute();
	const router = useRouter();
	const $q = useQuasar();
	const state = reactive({
		pageReady: false,
		loading: false,
		deleting: false
	});

	const apiUrl = computed(() => {
		let id = props.id || "";
		if (id) id = encodeURIComponent(id);
		let path = `${props.apiPath}/${id}`;
		let query = route.query;
		let queryParams = utils.serializeQuery(query);
		if (queryParams) {
			path += "?" + queryParams;
		}
		return path
	});

	async function load(apiPath) {
		let url = apiPath || apiUrl.value;
		try {
			state.pageReady = false;
			state.loading = true;
			// fetch currentRecord from api and keep in page store
			await store.fetchRecord(url);
			state.pageReady = true;
		}
		catch (err) {
			app.showPageRequestError(err);
		}
		finally {
			state.loading = false;
		}
	}

	watch(apiUrl, () => { load(); });

	onMounted(() => {
        load();
    });

	const computedProps = {
		apiUrl,
	}
	const methods = {
		load
	}

	return {
		state,
		computedProps,
		methods,
	}
}
