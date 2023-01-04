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
  loading.value = false;
};
onMounted(() => {
  if (userData) {
    checkMail();
  }
})
</script>

<template>
  <main>
    <div v-if="loading"
      class="fixed top-0 left-0 flex backdrop-blur-md justify-center items-center w-full h-full bg-white bg-opacity-80">
      <div class="flex justify-center items-center">
        <SpinnerIcon class="h-14 w-14 fill-slate-500 animate-spin"></SpinnerIcon>
      </div>
    </div>
    <div v-if="userData" class="flex flex-col space-y-8">
      <div v-if="emails.length > 0" v-for="email in emails" class="flex bg-gray-50 p-4 rounded-xl">
        <div class="flex flex-col space-y-2" :class="{ 'font-bold': !email.isRead }">
          <div class="flex">
            <span class="text-xl">{{ email.subject }}</span>
          </div>
          <div class="flex">
            <p class="text-sm">{{ email.bodyPreview }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
