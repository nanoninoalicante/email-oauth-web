<script setup>
const props = defineProps(["email"]);
const email = props.email;
</script>
<template>
    <div
        class="flex flex-col w-full space-y-2"
        :class="{ 'font-bold': !email.isRead }"
    >
        <div class="flex flex-col py-2 px-4 bg-gray-100 rounded-2xl">
            <span class="text-md"
                >From: {{ email.from?.emailAddress?.name }}</span
            >
            <span class="text-sm"
                >From: {{ email.from?.emailAddress?.address }}</span
            >
            <span v-for="to in email.toRecipients" class="text-sm"
                >To: {{ to.emailAddress?.address }}</span
            >
        </div>
        <div class="px-2">
            <a
                :href="email.webLink"
                target="_blank"
                class="text-xl hover:underline cursor-pointer"
                >{{ email.subject }}</a
            >
        </div>
        <div class="px-2">
            <p class="text-xs">{{ email.bodyPreview }}</p>
        </div>
    </div>
</template>
