import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    function isLoggedIn() {
      const accessToken = localStorage.getItem('accessToken');
      return !isEmpty(accessToken);
    }
    if (!isLoggedIn()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
