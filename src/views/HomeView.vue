<script setup>
import { useLogin } from "@/composables/login";
const { userData } = useLogin();
</script>

<template>
    <main>
        <div class="container mx-auto">
            <div class="m-8 flex justify-center items-center">
                <a
                    v-if="userData"
                    href="/email"
                    class="p-4 m-4 rounded-2xl text-md bg-blue-500 text-white"
                >
                    View Emails
                </a>
            </div>
            <div class="m-8">
                <pre class="text-xs">{{ userData }}</pre>
            </div>
        </div>
    </main>
</template>
