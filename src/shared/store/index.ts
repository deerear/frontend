import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  profileImg: string;
  logIn: () => void;
  logOut: () => void;
  // eslint-disable-next-line
  setProfileImgStore: (profileImg: string) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  profileImg: '',
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false, profileImg: '' }),
  setProfileImgStore: (profileImg) => set({ profileImg })
}));

export default useAuthStore;
