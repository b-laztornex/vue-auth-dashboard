<template>
  <div class="dashboard">
    <button class="toggle-button" @click="toggleUserList">
      {{ showUserList ? 'Hide' : 'Show' }} User List
    </button>
    <div class="dashboard-container">
      <!-- Toggle button -->

      <div v-if="showUserList" class="user-list">
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
      <div :class="{ 'main-content-expanded': !showUserList }" class="main-content">
        <UserDetails v-if="selectedUser" :user="selectedUser" />
        <hr />
        <AssetOverview :assets="assets" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
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
    const authStore = useAuthStore();
    const users = ref<User[]>([]);
    const selectedUser = ref<User | null>(null);
    const assets = ref<Asset[]>([]);
    const showUserList = ref(true); // Toggle user list visibility

    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        users.value = response.data.map((user: User) => ({
          ...user,
        }));
        if (users.value.length > 0) {
          const lastUser = users.value[users.value.length - 1];
          await selectUser(lastUser._id);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const selectUser = async (id: string) => {
      try {
        const response = await apiClient.get(`/users/${id}`);
        selectedUser.value = response.data;
        assets.value = response.data.assets;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const toggleUserList = () => {
      showUserList.value = !showUserList.value;
    };

    onMounted(fetchUsers);

    return { authStore, users, selectedUser, selectUser, assets, showUserList, toggleUserList };
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
  align-items: flex-start; /* Align user list and main content at the top */
  transition: all 0.3s ease;
}

/* Button to toggle the user list */
.toggle-button {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #0056b3;
}

/* User list styles */
.user-list {
  flex: 1;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease; /* Smooth transition */
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

.user-preview.non-clickable {
  background-color: #e9ecef; /* Slightly darker background */
  cursor: not-allowed;
}

/* Main content styles */
.main-content {
  flex: 2;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.main-content-expanded {
  flex: 3; /* Take more space when user list is hidden */
}

.main-content > *:not(:last-child) {
  margin-bottom: 20px; /* Space between components */
}
</style>
