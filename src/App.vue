<script setup>
import { RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useLogin } from "@/composables/login";
const { checkAccounts, login, userData } = useLogin();
onBeforeMount(() => {
    const accounts = checkAccounts();
    if (!accounts || accounts.length === 0) {
        if (window.location.pathname !== "/") {
            window.location.href = "/";
        }
    }
});
</script>

<template>
    <header class="container mx-auto">
        <div class="m-4 p-4">
            <h1 class="text-3xl font-medium text-left">Email OAuth</h1>
        </div>
        <div class="flex"></div>
        <div
            class="fixed right-0 top-0 m-4 text-right md:mr-12 bg-white rounded-3xl p-6"
        >
            <button
                v-if="!userData"
                @click="login"
                class="p-4 rounded-2xl text-md bg-blue-500 text-white"
            >
                Login with Microsoft
            </button>
            <div v-if="userData" class="flex flex-col text-gray-600">
                <p v-if="userData.name" class="text-sm">You are logged in</p>
                <p v-if="userData.name" class="text-sm">{{ userData.name }}</p>
                <p v-if="userData.username" class="text-xs">
                    {{ userData.username }}
                </p>
            </div>
        </div>
    </header>
    <div class="container mx-auto py-4 my-4">
        <RouterView />
    </div>
</template>
