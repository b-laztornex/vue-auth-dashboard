<template>
  <div class="dashboard">
    <h1 class="dashboard-header">Welcome</h1>
    <div class="dashboard-container">
      <div class="user-list">
        <h2>Users</h2>
        <div
          v-for="user in users"
          :key="user._id"
          class="user-preview"
          @click="selectUser(user._id)"
        >
          <p>
            <strong>{{ user.username }}</strong> ({{ user.role }})
          </p>
        </div>
      </div>
      <div class="main-content">
        <AssetOverview :assets="assets" />
        <UserDetails v-if="selectedUser" :user="selectedUser" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { Asset, User } from '../types/types';
import { useAuthStore } from '../stores/auth';
import AssetOverview from '../components/AssetOverview.vue';
import UserDetails from '../components/UserDetails.vue';
import apiClient from '../service/apiClient';

export default defineComponent({
  components: {
    AssetOverview,
    UserDetails,
  },
  setup() {
    // Initialize the auth store
    const authStore = useAuthStore();

    // Reactive state variables
    const users = ref<User[]>([]); // List of all users
    const selectedUser = ref<User | null>(null); // Currently selected user
    const assets = ref<Asset[]>([]); // Assets of the selected user

    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        users.value = response.data; // Populate the users list
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch details of a selected user, including their assets
    const selectUser = async (id: string) => {
      try {
        const response = await apiClient.get(`/users/${id}`);
        selectedUser.value = response.data; // Populate the selected user's details
        assets.value = response.data.assets; // Populate the selected user's assets
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Fetch the users list when the component mounts
    onMounted(fetchUsers);

    // Return reactive variables and methods to the template
    return { authStore, users, selectedUser, selectUser, assets };
  },
});
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dashboard-header {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

.dashboard-container {
  display: flex;
  gap: 20px;
}

/* Left column for show the  User list */
.user-list {
  flex: 1;
  background-color: #ffffff; /* White background for the user list */
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-list h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 15px;
}

.user-preview {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.user-preview:hover {
  background-color: #f1f9ff; /* Light blue hover effect */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Right column: Main content show asset overview and user details*/
.main-content {
  flex: 2;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-content > *:not(:last-child) {
  margin-bottom: 20px; /* Space between components */
}
</style>
