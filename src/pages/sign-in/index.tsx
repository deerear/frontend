/** @jsxImportSource @emotion/react */
import { JSX } from 'react';
import { css } from '@emotion/react';
import Layout from '~/widgets/layout';
import { H1 } from '~/shared/components/typography';
import Flex from '~/shared/components/flex';
import Label from '~/shared/components/label';
import ImageButton from '~/shared/components/button/image-button';
import Router from 'next/router';

import kakao from 'public/kakao.png';
import naver from 'public/naver.png';
import user from 'public/user.png';

const loginButtons = [
  {
    src: kakao,
    alt: '카카오로 로그인',
    action: () => console.log('카카오로 로그인')
  },
  {
    src: naver,
    alt: '네이버로 로그인',
    action: () => console.log('네이버로 로그인')
  },
  {
    src: user,
    alt: '이메일로 로그인',
    action: () => Router.push('/sign-in/user')
  }
];

function HeaderSection() {
  return (
    <Flex justifyContent='center' alignItems='center' direction='column' rowGap='2rem'>
      <div
        css={css`
          text-align: center;
          padding: 2rem 0;
        `}
      >
        <H1>Dearear</H1>
        <br />
        <Label>
          지역의 목소리를 익명으로 나누는
          <br />
          소셜 네트워크
        </Label>
      </div>
    </Flex>
  );
}

function ButtonSection() {
  return (
    <Flex columnGap='2rem' justifyContent='center' alignItems='center'>
      {loginButtons.map(({ src, alt, action }) => (
        <ImageButton key={alt} src={src} alt={alt} width={75} height={75} onClick={action} />
      ))}
    </Flex>
  );
}

function SignIn(): JSX.Element {
  return (
    <Flex direction='column' rowGap='15rem'>
      <HeaderSection />
      <ButtonSection />
    </Flex>
  );
}

SignIn.layout = (page: JSX.Element): JSX.Element => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='로그인'>{page}</Layout.Content>
  </Layout>
);

export default SignIn;
