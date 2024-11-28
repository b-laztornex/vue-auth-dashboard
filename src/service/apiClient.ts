import axios from 'axios';

const baseApiURL = import.meta.env.VITE_API_URL;
// Create an Axios instance
const apiClient = axios.create({
  baseURL: baseApiURL || 'http://localhost:5001/api', // Replace with the correct backend URL
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to include the token in the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // Extract token from cookies
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Function to set up the response interceptor with a router instance
export function setupInterceptors(router) {
  apiClient.interceptors.response.use(
    (response) => {
      // Pass through successful responses
      return response;
    },
    async (error) => {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          console.error('Unauthorized:', data?.message || 'Unknown error');

          try {
            // Call the backend /logout endpoint to clear cookies
            await apiClient.post('/logout');
          } catch (logoutError) {
            console.error(
              'Error during logout:',
              logoutError.response?.data || logoutError.message
            );
          }

          // Redirect to login page using the provided router instance
          router.push('/');
        } else if (status === 400) {
          console.error('Bad Request:', data?.message || 'Unknown error');
        } else {
          console.error(`Error ${status}:`, data?.message || 'Unknown error');
        }
      } else {
        console.error('Network Error:', error.message);
      }

      return Promise.reject(error); // Reject the error for further handling if needed
    }
  );
}

export default apiClient;
