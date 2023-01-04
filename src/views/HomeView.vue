<script setup>
import { onMounted } from "vue";
import { useLogin } from "@/composables/login";
const { checkAccounts, login, userData, accessToken, seeProfile } = useLogin();
onMounted(() => {
  checkAccounts();
});
</script>

<template>
  <main>
    <div class="w-full flex justify-center items-center mb-8">
      <button @click="login" class="p-4 rounded-2xl text-md bg-blue-500 text-white">
        Login with Microsoft
      </button>
    </div>
    <div v-if="userData" class="w-full flex justify-center items-center flex-col space-y-4">
      <div class="flex">
        <h3 class="text-xl">You are logged in</h3>
      </div>
      <div class="flex">
        <p class="text-lg">{{ userData.name }}</p>
      </div>
      <div class="flex">
        <p class="text-lg">{{ userData.username }}</p>
      </div>
      <div class="flex">
        <button @click="seeProfile" class="p-4 rounded-2xl text-md bg-blue-500 text-white">
          Get new token
        </button>
      </div>
      <div class="flex">
        <span class="break-all">{{ accessToken }}</span>
      </div>
    </div>
  </main>
</template>
