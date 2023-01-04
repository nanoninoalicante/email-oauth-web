<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import { useLogin } from "@/composables/login";
const {
  checkAccounts,
  login,
  userData,
  accessToken,
  getToken,
  readMail,
  seeProfile,
} = useLogin();
onMounted(() => {
  checkAccounts();
});
</script>

<template>
  <header>
    <div class="container mx-auto my-4 p-y4">
      <h1 class="text-3xl font-medium text-center">Email OAuth</h1>
    </div>
    <div class="fixed right-0 top-0 m-4">
      <button @click="login" class="p-4 rounded-2xl text-md bg-blue-500 text-white">
        Login with Microsoft
      </button>
    </div>
    <div v-if="userData" class="w-full flex justify-center items-center flex-col space-y-4">
      <div class="flex">
        <h3 class="text-xl">You are logged in</h3>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-lg">{{ userData.name }}</p>
        <p class="text-lg">{{ userData.username }}</p>
      </div>
    </div>
  </header>
  <div class="container mx-auto py-4 my-4">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
