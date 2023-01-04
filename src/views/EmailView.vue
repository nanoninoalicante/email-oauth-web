<script setup>
import { onMounted, ref } from "vue";
import { useLogin } from "@/composables/login";
const { readMail } = useLogin();
const emails = ref([]);
onMounted(async () => {
  const { response = {} } = await readMail();
  emails.value = response.value;
});
</script>

<template>
  <main>
    <div class="flex flex-col space-y-8">
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
