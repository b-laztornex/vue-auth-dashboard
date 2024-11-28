import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Login from '@/views/LoginPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => ({
    login: vi.fn(),
    errorMessage: '',
  })),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('Login Component', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  const mockAuthStore = useAuthStore();

  it('renders the login form correctly', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h1').text()).toBe('Login');
    expect(wrapper.find('#username').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
    expect(wrapper.find('.login-button').exists()).toBe(true);
  });

  it('updates username and password values', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    const usernameInput = wrapper.find('#username');
    const passwordInput = wrapper.find('#password');

    await usernameInput.setValue('testuser');
    await passwordInput.setValue('testpassword');

    expect(wrapper.vm.credentials.username).toBe('testuser');
    expect(wrapper.vm.credentials.password).toBe('testpassword');
  });

  it('calls handleLogin on form submit', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    const loginSpy = vi.spyOn(wrapper.vm, 'handleLogin');

    await wrapper.find('form').trigger('submit.prevent');
    expect(loginSpy).toHaveBeenCalled();
  });

  it('displays error message on failed login', async () => {
    mockAuthStore.login.mockResolvedValue(false);
    mockAuthStore.errorMessage = 'Login failed. Please try again.';

    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('#username').setValue('wronguser');
    await wrapper.find('#password').setValue('wrongpassword');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockAuthStore.login).toHaveBeenCalledWith({
      username: 'wronguser',
      password: 'wrongpassword',
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.error').text()).toBe('Login failed. Please try again.');
  });

  it('redirects to /dashboard on successful login', async () => {
    const mockRouterPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push: mockRouterPush });

    mockAuthStore.login.mockResolvedValue(true);

    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('#username').setValue('GoldingAdmin');
    await wrapper.find('#password').setValue('GoldingAdmin');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockAuthStore.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
    });

    await wrapper.vm.$nextTick();

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard');
  });

  it('disables the login button while loading', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    wrapper.setData({ isLoading: true });

    await wrapper.vm.$nextTick();

    const loginButton = wrapper.find('.login-button');
    expect(loginButton.attributes('disabled')).toBe('disabled');
    expect(loginButton.text()).toBe('Loading...');
  });
});
