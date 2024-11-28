import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import DashboardPage from '@/views/DashboardPage.vue'; // Fix: Removed extra space in the import
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global beforeEach guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); // Initialize the store

  // Fetch authentication state (assumes `isAuthenticated` is a computed property or method)
  const isAuthenticated = await authStore.isAuthenticated;

  // If navigating to the login page and already authenticated, redirect to dashboard
  if (to.name === 'login' && isAuthenticated) {
    console.log('Already authenticated. Redirecting to dashboard...');
    return next({ name: 'dashboard' });
  }

  // If navigating to a protected route and not authenticated, redirect to login
  if (to.name === 'dashboard' && !isAuthenticated) {
    console.log('Not authenticated. Redirecting to login...');
    return next({ name: 'login' });
  }

  // Allow navigation for all other routes
  console.log('Allowing navigation...');
  next();
});

export default router;
