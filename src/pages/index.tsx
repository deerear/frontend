import type { Page } from '~/shared/types';

import Layout from '~/widgets/layout';

const Home: Page = () => {
  return <div>Hello World</div>;
};

Home.layout = (page) => {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Content page='홈'>{page}</Layout.Content>
    </Layout>
  );
};

export default Home;
