/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HttpStatusCode } from 'axios';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { ReactNode, useState, JSX } from 'react';
import { signIn } from '~/entities/api';
import OutlinedButton from '~/shared/components/button/outlined-button';
import StandardButton from '~/shared/components/button/standard-button';
import Flex from '~/shared/components/flex';
import Input from '~/shared/components/input';
import Layout from '~/widgets/layout';
import useAuthStore from '~/shared/store';
import Label from '~/shared/components/label';

function UserSignIn(): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuthStore();

  const handleClickReturn = () => {
    Router.back();
  };

  const handleUserSignIn = async () => {
    if (isEmpty(id) || isEmpty(password)) {
      alert('모든 항목을 입력해주세요');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(id)) {
      alert('유효한 이메일 주소를 입력해주세요');
    }

    const response = await signIn(id, password);

    localStorage.setItem('accessToken', response.accessToken as string);
    localStorage.setItem('refreshToken', response.refreshToken as string);

    if (response.status === HttpStatusCode.Ok) {
      alert('로그인 되었습니다.');
      logIn();
      Router.push('/');
    } else {
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <Flex direction='column' justifyContent='center' alignItems='center' rowGap='15px'>
      <Input label='이메일' type='email' placeholder='이메일' value={id} onChange={(e) => setId(e.target.value)} />
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Label>
        아직 회원이 아니시라면?{' '}
        <span
          role='button'
          onClick={() => Router.push('/sign-up')}
          onKeyDown={() => Router.push('/sign-up')}
          tabIndex={0}
        >
          <b>회원가입</b>
        </span>
      </Label>
      <Flex
        css={css`
          width: 100%;
          margin-top: 15px;
        `}
        columnGap='10px'
      >
        <OutlinedButton
          onClick={handleClickReturn}
          color='primary'
          css={css`
            width: 50%;
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
          `}
        >
          돌아가기
        </OutlinedButton>
        <StandardButton
          onClick={handleUserSignIn}
          color='primary'
          css={css`
            width: 50%;
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
            border-radius: 5px;
          `}
        >
          로그인하기
        </StandardButton>
      </Flex>
    </Flex>
  );
}

UserSignIn.layout = (page: ReactNode): JSX.Element => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='회원가입'>{page}</Layout.Content>
  </Layout>
);

export default UserSignIn;
