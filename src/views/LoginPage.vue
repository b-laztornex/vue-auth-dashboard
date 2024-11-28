<template>
  <div class="login-container">
    <!-- Background Video -->
    <video autoplay muted loop class="bg-video" preload="auto">
      <source
        src="https://cdn.pixabay.com/video/2022/03/16/110923-689949643_large.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>

    <!-- Login Form -->
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <!-- Username Input -->
        <div class="form-group">
          <label for="username" class="sr-only">Username</label>
          <input
            id="username"
            v-model="credentials.username"
            placeholder="Username"
            required
            class="form-input"
            aria-label="Enter your username"
          />
        </div>

        <!-- Password Input -->
        <div class="form-group">
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            placeholder="Password"
            required
            class="form-input"
            aria-label="Enter your password"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="login-button" :disabled="isLoading" aria-busy="isLoading">
          <span v-if="!isLoading">Login</span>
          <span v-else>Loading...</span>
        </button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const credentials = ref({ username: '', password: '' });
    const isLoading = ref(false);
    const errorMessage = ref('');

    const handleLogin = async () => {
      isLoading.value = true;
      errorMessage.value = '';
      const success = await authStore.login(credentials.value);
      isLoading.value = false;

      if (success) {
        router.push('/dashboard'); // Redirect to dashboard after successful login
      } else {
        errorMessage.value = authStore.errorMessage || 'Login failed. Please try again.';
      }
    };

    return { credentials, isLoading, errorMessage, handleLogin };
  },
};
</script>

<style>
/* Container styles */
.login-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Background video styles */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.5); /* Darkens the video for better contrast */
}

/* Login form styles */
.login-form {
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  z-index: 1; /* Ensure it's above the video */
  animation: fadeIn 0.5s ease-out;
}

.login-form h1 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #00378e; /* Primary color for the title */
  font-weight: bold;
}

/* Form input styles */
.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #2180f2; /* Blue accent for focus */
}

/* Button styles */
.login-button {
  width: 100%;
  padding: 12px;
  background: #2180f2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.login-button:hover {
  background: #00378e; /* Darker blue for hover effect */
  transform: scale(1.02);
}

.login-button:disabled {
  background: #aaa; /* Gray for disabled state */
  cursor: not-allowed;
}

/* Error message styles */
.error {
  margin-top: 15px;
  color: red;
  font-size: 14px;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (max-width: 600px) {
  .login-form {
    padding: 20px;
    width: 90%;
  }

  .form-input {
    font-size: 14px;
  }

  .login-button {
    font-size: 14px;
  }
}
</style>
