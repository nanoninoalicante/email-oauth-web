<script setup>
import { onMounted, ref, watch } from "vue";
import { useLogin } from "@/composables/login";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
const { readMail, userData } = useLogin();
const emails = ref([]);
const loading = ref(false);
const checkMail = async () => {
    loading.value = true;
    const { response = {} } = await readMail();
    emails.value = response.value;
    console.log("emails: ", response.value);
    loading.value = false;
};
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
        <div v-if="userData" class="flex flex-col space-y-8">
            <div
                v-if="emails.length > 0"
                v-for="email in emails"
                class="flex w-full bg-gray-50 p-4 rounded-xl"
            >
                <div
                    class="flex flex-col w-full space-y-2"
                    :class="{ 'font-bold': !email.isRead }"
                >
                    <div
                        class="flex flex-col py-2 px-4 bg-gray-100 rounded-2xl"
                    >
                        <span class="text-md">{{
                            email.from?.emailAddress?.name
                        }}</span>
                        <span class="text-sm">{{
                            email.from?.emailAddress?.address
                        }}</span>
                    </div>
                    <div class="px-2">
                        <a
                            :href="email.webLink"
                            target="_blank"
                            class="text-xl hover:underline cursor-pointer"
                            >{{ email.subject }}</a
                        >
                    </div>
                    <div class="px-2">
                        <p class="text-xs">{{ email.bodyPreview }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
