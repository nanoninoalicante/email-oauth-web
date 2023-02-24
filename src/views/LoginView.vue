<script setup>
import { useFirebaseAuth } from "@/composables/auth";
const { signIn, email, password, user } = useFirebaseAuth();
</script>

<template>
    <main>
        <div class="container mx-auto">
            <div
                v-if="!user"
                class="m-8 flex flex-col justify-center items-center w-1/2"
            >
                Login
                <input
                    v-model="email"
                    class="p-6 my-2 rounded-3xl border-2 border-gray-100 w-full"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <input
                    v-model="password"
                    class="p-6 my-2 rounded-3xl border-2 border-gray-100 w-full"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    @keydown.enter="signIn"
                />
                <button
                    class="py-4 px-8 my-2 bg-slate-400 rounded-3xl text-white hover:bg-slate-600"
                    @click.stop="signIn"
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
