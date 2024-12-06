/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// eslint-disable-next-line
import { HttpStatusCode } from 'axios';
// eslint-disable-next-line
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { ReactNode, useState, JSX } from 'react';
import { checkEmail, checkNickname, signUp } from '~/entities/api';
import OutlinedButton from '~/shared/components/button/outlined-button';
import StandardButton from '~/shared/components/button/standard-button';
import Flex from '~/shared/components/flex';
import SearchInput from '~/shared/components/Form/SearchInput';
import Input from '~/shared/components/input';
import Layout from '~/widgets/layout';

function SignUp(): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  // eslint-disable-next-line
  const [isIdDuplicatedCheck, setIsIdDuplicatedCheck] = useState(false);
  const [isNicknameDuplicatedCheck, setIsNicknameDuplicatedCheck] = useState(false);

  const handleClickIdDuplicationCheck = async () => {
    if (isEmpty(id)) {
      alert('아이디를 입력 후 검색해주세요');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(id)) {
      alert('유효한 이메일 주소를 입력해주세요');
      return;
    }

    const response = await checkEmail(id);
    if (Number(response.status) === HttpStatusCode.BadRequest) {
      alert(response.message);
    } else if (Number(response.status) === HttpStatusCode.InternalServerError) {
      alert(response.message);
    } else {
      setIsIdDuplicatedCheck(true);
      alert('사용 가능한 이메일입니다');
    }
  };

  const handleClickNicknameDuplicationCheck = async () => {
    if (isEmpty(nickname)) {
      alert('닉네임을 입력 후 검색해주세요');
    }
    const response = await checkNickname(nickname);
    if (Number(response.status) === HttpStatusCode.BadRequest) {
      alert(response.message);
    } else if (Number(response.status) === HttpStatusCode.InternalServerError) {
      alert(response.message);
    } else {
      setIsNicknameDuplicatedCheck(true);
      alert('사용 가능한 닉네임입니다');
    }
  };

  const handleClickReturn = () => {
    Router.back();
  };

  const handleSignUp = async () => {
    if (isEmpty(id) || isEmpty(password) || isEmpty(passwordConfirm) || isEmpty(nickname)) {
      alert('모든 항목을 입력해주세요');
      return;
    }

    // if (!isIdDuplicatedCheck) {
    //   alert('이메일 중복확인을 해주세요');
    //   return;
    // }

    if (!isNicknameDuplicatedCheck) {
      alert('닉네임 중복확인을 해주세요');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    const response = await signUp(id, password, nickname);
    if (response.status === HttpStatusCode.BadRequest) {
      alert('모든 항목을 입력해주세요');
    } else if (response.status === HttpStatusCode.InternalServerError) {
      alert('서버 오류입니다. 잠시 후 다시 시도해주세요');
    } else {
      alert('회원가입이 완료되었습니다');
      Router.push('/sign-in');
    }
  };

  return (
    <Flex direction='column' justifyContent='center' alignItems='center' rowGap='15px'>
      <SearchInput
        label='이메일'
        handleSearchClick={handleClickIdDuplicationCheck}
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호 확인'
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <SearchInput
        label='닉네임'
        handleSearchClick={handleClickNicknameDuplicationCheck}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
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
          onClick={handleSignUp}
          color='primary'
          css={css`
            width: 50%;
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
            border-radius: 5px;
          `}
        >
          회원가입하기
        </StandardButton>
      </Flex>
    </Flex>
  );
}

SignUp.layout = (page: ReactNode): JSX.Element => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='회원가입'>{page}</Layout.Content>
  </Layout>
);

export default SignUp;
