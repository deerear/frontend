import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/sign-in');
      }
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
