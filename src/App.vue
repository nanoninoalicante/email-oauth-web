<script setup>
import { RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useLogin } from "@/composables/login";
const { checkAccounts, login, userData, signOut } = useLogin();
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
    <header class="flex flex-row justify-between">
        <div class="m-4 p-8">
            <h1 class="text-3xl font-medium text-left">Email OAuth</h1>
        </div>
        <div class="m-4 text-right bg-white rounded-3xl p-4">
            <button
                v-if="!userData"
                @click="login"
                class="px-4 py-3 mb-2 rounded-3xl text-md bg-blue-500 text-white active:bg-blue-900 hover:bg-blue-700"
            >
                Login with Microsoft
            </button>
            <button
                v-if="userData"
                @click="signOut(userData.username)"
                class="px-4 py-2 mb-2 rounded-3xl text-sm bg-gray-500 text-white active:bg-gray-700 hover:bg-gray-600"
            >
                Sign Out
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
