<script setup>
import { onMounted, ref, watch } from "vue";
import { useLogin } from "@/composables/login";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import Email from "@/components/Email.vue";
import { useStorage } from "@vueuse/core";
const { readMail, userData, checkAccounts } = useLogin();
const emails = ref([]);
const loading = ref(false);
const direction = ref("from");
const emailFilter = useStorage("email-filter", null, sessionStorage);
const checkMail = async () => {
    console.log("checking email");
    loading.value = true;
    const { response = {} } = await readMail(
        emailFilter.value,
        direction.value
    );
    emails.value = response.value;
    console.log("emails: ", response.value);
    loading.value = false;
};
onBeforeMount(() => {
    const accounts = checkAccounts();
    if (!accounts || accounts.length === 0) {
        if (window.location.pathname !== "/") {
            window.location.href = "/";
        }
    }
});
onMounted(() => {
    if (userData) {
        checkMail();
    }
});
</script>

<template>
    <main>
        <div
            v-if="loading"
            class="fixed top-0 left-0 flex backdrop-blur-md justify-center items-center w-full h-full bg-white bg-opacity-80"
        >
            <div class="flex justify-center items-center">
                <SpinnerIcon
                    class="h-14 w-14 fill-slate-500 animate-spin"
                ></SpinnerIcon>
            </div>
        </div>
        <div class="mb-4">
            <input
                v-model="emailFilter"
                type="text"
                class="text-lg p-4 m-4 rounded-3xl bg-gray-100 text-gray-600 md:w-2/3"
                placeholder="Filter by from/to email"
            />
            <select
                v-model="direction"
                name="direction"
                class="p-4 m-4 rounded-3xl"
            >
                <option value="to">To</option>
                <option value="from">From</option>
            </select>
            <button
                @click="checkMail"
                class="rounded-3xl ring-2 ring-blue-300 active:bg-blue-700 bg-blue-400 p-4 hover:bg-blue-500 text-white"
            >
                Filter
            </button>
        </div>
        <div v-if="userData" class="flex flex-col space-y-8">
            <div
                v-if="emails.length > 0"
                v-for="email in emails"
                class="flex w-full bg-gray-50 p-4 rounded-xl"
            >
                <Email :email="email"></Email>
            </div>
        </div>
    </main>
</template>
