import React, { JSX } from 'react';
import Layout from '~/widgets/layout';

function NewPost() {
  return <div>New Post</div>;
}

NewPost.layout = (page: React.ReactNode): JSX.Element => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='글쓰기'>{page}</Layout.Content>
  </Layout>
);

export default NewPost;
