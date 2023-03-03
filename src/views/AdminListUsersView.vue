<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useLogin } from "@/composables/login";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import { useFirebaseAuth } from "@/composables/auth";
const { isAuthenticated, user, auth, onAuthStateChanged, userToken } =
    useFirebaseAuth();

const { adminListUsers } = useLogin();
const loading = ref(false);
const users = ref([]);
onMounted(async () => {
    loading.value = true;
    onAuthStateChanged(auth, async (currentUser) => {
        console.log("current user: ", currentUser);
        console.log("is authenticated: ", isAuthenticated.value);
        if (isAuthenticated && isAuthenticated.value) {
            console.log("user token: ", userToken.value);
            const { response } = await adminListUsers(userToken.value);
            console.log("list user: ", response?.value);
            users.value = response?.value;

            loading.value = false;
        } else {
            loading.value = false;
            const currentPage = window.location.href;
            window.location.href = `/login?redirect=${encodeURIComponent(
                currentPage
            )}`;
        }
    });
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
        <div class="container mx-auto p-8 mb-4 m-0">
            <h1 class="text-2xl py-4 mb-4">Users</h1>
            <div
                v-if="users && users.length > 0"
                class="flex flex-col space-y-4 w-full md:w-2/3"
            >
                <a
                    class="p-4 bg-slate-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 cursor-pointer"
                    v-for="user in users"
                    :href="`/admin/user/${user.id}/email`"
                    >{{ user.displayName }} - {{ user.mail }}</a
                >
            </div>
        </div>
    </main>
</template>
