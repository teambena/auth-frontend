import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { ApiService } from "src/services/api";

function getPageStore(pageName, defaultState = {}) {
    return defineStore(pageName, () => {
        const storeInitialized = ref(false);
        const pageState = {
            records: [],
            currentRecord: null,
            formData: null,
            editRecord: null,
            id: null,
            primaryKey: "",
        };
        const initState = { ...pageState, ...defaultState };
        const state = reactive(initState);

        function init(data) {
            Object.assign(state, data);
            storeInitialized.value = true;
        }

        async function fetchRecords(args) {
            try {
                state.currentRecord = null;
                const { url, merge } = args;
                const response = await ApiService.get(url);
                const apiData = response.data;
                if (apiData) {
                    const newRecords = apiData.records || apiData;
                    if (merge) {
                        state.records = state.records.concat(newRecords);
                    } else {
                        state.records = newRecords;
                    }
                }
                return apiData;
            } catch (err) {
                throw err;
            }
        }

        async function fetchRecord(url) {
            try {
                //state.currentRecord = null;
                const response = await ApiService.get(url);
                const apiData = response.data;
                if (apiData) {
                    state.currentRecord = apiData;
                }
                return apiData;
            } catch (err) {
                throw err;
            }
        }

        async function fetchEditRecord(url) {
            try {
                const response = await ApiService.get(url);
                const apiData = response.data;
                if (apiData) {
                    state.editRecord = apiData;
                }
                return apiData;
            } catch (err) {
                throw err;
            }
        }

        async function saveRecord(args) {
            try {
                const { url, payload } = args;
                const response = await ApiService.post(url, payload);
                const newRecord = response.data;
                if (newRecord) {
                    if (Array.isArray(newRecord)) {
                        for (let index = 0; index < newRecord.length; index++) {
                            state.records.unshift(newRecord[index]);
                        }
                    } else {
                        state.records.unshift(newRecord);
                    }
                }
                return newRecord;
            } catch (err) {
                throw err;
            }
        }

        async function updateRecord(args) {
            try {
                const { url, payload } = args;
                const response = await ApiService.post(url, payload);
                const updatedRecord = response.data;
                if (updatedRecord) {
                    const item = state.records.find(
                        (item) =>
                            item[state.primaryKey] ==
                            updatedRecord[state.primaryKey]
                    );
                    if (item) {
                        Object.assign(item, updatedRecord);
                        state.currentRecord = item;
                    }
                    if (state.currentRecord) {
                        Object.assign(state.currentRecord, updatedRecord);
                    }
                }
                return updatedRecord;
            } catch (err) {
                throw err;
            }
        }

        return {
            state,
            init,
            storeInitialized,
            fetchRecords,
            fetchRecord,
            fetchEditRecord,
            saveRecord,
            updateRecord,
        };
    })();
}

export function usePageStore(pageName, defaultState) {
    const store = getPageStore(pageName, defaultState);
    if (!store.storeInitialized && defaultState) {
        store.init(defaultState);
    }
    return store;
}
