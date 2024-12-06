// eslint-disable-next-line
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Comment, DM, PaginatedResponse, Post, Profile } from '~/shared/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

let isRefreshing = false;
// eslint-disable-next-line
let refreshSubscribers: Array<(token: string) => void> = [];

const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};
// eslint-disable-next-line
const addRefreshSubscriber = (callback: (token: string) => void): void => {
  refreshSubscribers.push(callback);
};

const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      status: error.response.status,
      message: error.response.data.message || defaultMessage
    };
  }
  return {
    status: 500,
    message: '네트워크 오류가 발생했습니다.'
  };
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const modifiedConfig = { ...config };
      if (modifiedConfig.headers) {
        modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return modifiedConfig;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { retry?: boolean };

    if (axios.isAxiosError(error) && error.response?.status === 401 && !originalRequest.retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest.retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await api.post<{ accessToken: string; refreshToken: string }>('/api/token/refresh', {
            refreshToken
          });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          isRefreshing = false;
          onRefreshed(newAccessToken);

          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export const signIn = async (
  email: string,
  password: string
): Promise<{
  grantType?: string;
  accessToken?: string;
  refreshToken?: string;
  status: number;
  message: string;
}> => {
  try {
    const response = await api.post('/api/members/sign-in', { email, password });
    return { ...response.data, status: response.status, message: '로그인 성공' };
  } catch (error) {
    return handleApiError(error, '로그인 실패');
  }
};

export const signUp = async (
  email: string,
  password: string,
  nickname: string
): Promise<{
  email?: string;
  nickname?: string;
  status: number;
  message: string;
}> => {
  try {
    const response = await api.post('/api/members/sign-up', { email, password, nickname });
    return { ...response.data, status: response.status, message: '회원가입 성공' };
  } catch (error) {
    return handleApiError(error, '회원가입 실패');
  }
};

export const checkNickname = async (nickname: string): Promise<{ status: number; message: string }> => {
  try {
    const response = await api.get('/api/members/check-nickname', { params: { nickname } });
    return { status: response.status, message: '닉네임 사용 가능' };
  } catch (error) {
    return handleApiError(error, '닉네임 조회 실패');
  }
};

export const checkEmail = async (email: string): Promise<{ status: number; message: string }> => {
  try {
    const response = await api.get('/api/members/check-email', { params: { email } });
    return { status: response.status, message: '이메일 사용 가능' };
  } catch (error) {
    return handleApiError(error, '이메일 조회 실패');
  }
};

export const getPosts = async (key: string, size: number): Promise<PaginatedResponse<Post>> => {
  const response = await api.get('/api/members/posts', { params: { key, size } });
  return response.data;
};

export const getComments = async (key: string, size: number): Promise<PaginatedResponse<Comment>> => {
  const response = await api.get('/api/members/comments', { params: { key, size } });
  return response.data;
};

export const getDMs = async (key: string, size: number): Promise<PaginatedResponse<DM>> => {
  const response = await api.get('/api/members/dms', { params: { key, size } });
  return response.data;
};

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get('/api/members/profile');
  return response.data;
};

export const editProfile = async (editProfileRequest: {
  nickname?: string;
  profileImg?: File;
}): Promise<{ status: number; profileImg: string; message: string }> => {
  const formData = new FormData();

  if (editProfileRequest.nickname) {
    formData.append('nickname', editProfileRequest.nickname);
  }
  if (editProfileRequest.profileImg) {
    formData.append('profileImg', editProfileRequest.profileImg);
  }

  try {
    const response = await api.put('/api/members/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { status: response.status, profileImg: response.data.profileImg, message: '프로필 수정 성공' };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        profileImg: '',
        message: error.response.data.message || '프로필 수정 실패'
      };
    }
    return {
      status: 500,
      profileImg: '',
      message: '프로필 수정 실패'
    };
  }
};

export default api;
