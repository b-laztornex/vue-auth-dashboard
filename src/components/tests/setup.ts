import { vi } from 'vitest';

// Mock Vue Router if used
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));
