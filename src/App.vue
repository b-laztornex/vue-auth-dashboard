<template>
  <div id="app">
    <header v-if="showHeader">
      <div class="header-title">Alternative Assets Dashboard</div>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <a href="#" @click.prevent="logout">Logout</a>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer v-if="showFooter">
      <p>&copy; 2024 Alternative Assets Dashboard</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

export default {
  name: 'App',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showHeader = computed(() => route.name !== 'login');
    const showFooter = computed(() => route.name !== 'login');
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout(); // Call the logout action
      router.push({ name: 'login' }); // Redirect to the login page after logout
    };

    return { showHeader, showFooter, logout };
  },
};
</script>

<style>
/* Global styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #141414;
  margin: 0;
  padding: 0;
}

header {
  background: #2180f2;
  color: white;
  padding: 15px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
}

header nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

header nav a:hover {
  text-decoration: underline;
}

header nav a.router-link-active {
  text-decoration: underline;
}
header nav a.router-link-active {
  text-decoration: underline;
}

main {
  /* padding: 20px;*/
}

footer {
  text-align: center;
  padding: 10px;
  background: #00378e;
  color: white;
}
</style>
