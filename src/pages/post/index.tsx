import React from 'react';
import { css } from '@emotion/react';
import Layout from '~/widgets/layout';

function Posts() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 24px;
      `}
    >
      Posts
    </div>
  );
}

Posts.layout = (page: React.ReactNode) => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='글 목록'>{page}</Layout.Content>
  </Layout>
);

export default Posts;
