<script setup>
import { ref } from "vue";
import { useFirebaseAuth } from "@/composables/auth";
import { useRoute } from "vue-router";
const { signIn, email, password, user } = useFirebaseAuth();
const route = useRoute();
const loginError = ref(null);
const loading = ref(false);
const login = async () => {
    try {
        loading.value = true;
        await signIn().catch((error) => {
            throw error;
        });
        const redirect = route.query?.redirect || "/";
        window.location.href = redirect;
    } catch (error) {
        loading.value = false;
        console.log("error logging in : ", error.message || error);
        loginError.value = loginError.message || "error logging in";
    }
};
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
        <div class="container mx-auto">
            <div
                v-if="!user"
                class="m-8 flex flex-col justify-center items-center w-1/2"
            >
                Login
                <input
                    v-model="email"
                    class="p-6 my-2 rounded-3xl border-2 border-gray-100 w-full"
                    :class="{ 'border-red-500': loginError }"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <input
                    v-model="password"
                    class="p-6 my-2 rounded-3xl border-2 border-gray-100 w-full"
                    :class="{ 'border-red-500': loginError }"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    @keydown.enter="login"
                />
                <button
                    class="py-4 px-8 my-2 bg-slate-400 rounded-3xl text-white hover:bg-slate-600"
                    @click.stop="login"
                >
                    Sign In
                </button>
            </div>
            <div class="m-8">
                <pre class="text-xs">{{ user }}</pre>
            </div>
        </div>
    </main>
</template>
