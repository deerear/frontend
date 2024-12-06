import { JSX, ReactNode } from 'react';
import Layout from '~/widgets/layout';
import useAuth from '~/shared/hooks/useAuth';

function Home(): JSX.Element {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) return <div />;

  return <div>Hello World</div>;
}

Home.layout = (page: ReactNode): JSX.Element => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='홈'>{page}</Layout.Content>
  </Layout>
);

export default Home;
