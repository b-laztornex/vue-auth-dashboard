import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import apiClient from '@/service/apiClient';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    errorMessage: null,
  }),
  getters: {
    async isAuthenticated(): Promise<boolean> {
      try {
        // Send a request to the backend to check authentication
        const response = await apiClient.get('/check-session', { withCredentials: true });
        return response.status === 200; // Return true if authenticated
      } catch (error) {
        return false; // Return false if authentication fails
      }
    },
  },
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await apiClient.post('/login', credentials, {
          withCredentials: true, // Include cookies
        });

        console.log(response.data.user);
        this.user = response.data.user;
        this.errorMessage = null;
        return true;
      } catch (error: unknown) {
        const axiosError = error as AxiosError; // Cast to AxiosError
        this.errorMessage = axiosError.response?.data?.message || 'An error occurred';
        return false;
      }
    },
    async logout() {
      this.user = null; // Clear the user state
      try {
        await apiClient.post('/logout', {}, { withCredentials: true });
        // Clear any local state or redirects
        this.user = null; // Clear the user state
        window.location.href = '/'; // Redirect to the login page
      } catch (error) {
        console.error('Error during logout:', error.response?.data?.message || error.message);
      }
    },
  },
});
