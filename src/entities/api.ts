import axios from 'axios';

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await axios.post(
            '/api/token/refresh',
            { refreshToken },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              }
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setAccessToken(accessToken);
          setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export const signIn = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/members/sign-in', {
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(`Error: ${error.response.data.message}`);
    }
    throw error;
  }
};

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const response = await apiClient.post('/members/sign-up', {
      email,
      password,
      nickname
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(`Error: ${error.response.data.message}`);
    }
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post(
      '/token/refresh',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(`Error: ${error.response.data.message}`);
    }
    throw error;
  }
};

export default apiClient;
