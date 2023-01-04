<script setup>
import { useLogin } from "@/composables/login";
const { userData } = useLogin();
</script>

<template>
  <main>
    <div class="container mx-auto flex justify-center">
      <a v-if="userData" href="/email" class="p-4 rounded-2xl text-md bg-blue-500 text-white">
        View Emails
      </a>
    </div>
  </main>
</template>
