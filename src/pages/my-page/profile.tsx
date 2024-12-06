import React, { useRef, useState, JSX } from 'react';
import { css } from '@emotion/react';
import Layout from '~/widgets/layout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { editProfile, getProfile } from '~/entities/api';
import type { Profile as ProfileDataType } from '~/shared/types/api';
import Flex from '~/shared/components/flex';
import Input from '~/shared/components/input';
import OutlinedButton from '~/shared/components/button/outlined-button';
import StandardButton from '~/shared/components/button/standard-button';
import Router from 'next/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HttpStatusCode } from 'axios';
import useAuthStore from '~/shared/store';

interface EditProfileRequest {
  nickname?: string;
  profileImg?: File;
}

function Profile(): JSX.Element {
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError
  } = useQuery<ProfileDataType>({
    queryKey: ['profile'],
    queryFn: getProfile
  });

  const queryClient = useQueryClient();

  const [profileImg, setProfileImg] = useState<File>();
  const [profileImgSrc, setProfileImgSrc] = useState(profileData?.profileImg ?? '/avatar.png');
  const [nickname, setNickname] = useState(profileData?.nickname ?? '');

  const inputRef = useRef<HTMLInputElement>(null);

  const { setProfileImgStore } = useAuthStore();

  const handleClickReturn = () => {
    Router.back();
  };

  const handleClickEdit = async () => {
    if (profileData?.nickname === nickname && profileData?.profileImg === profileImgSrc) {
      alert('변경된 사항이 없습니다.');
      return;
    }

    const editProfileRequest: EditProfileRequest = {
      nickname,
      profileImg
    };

    if (profileData?.nickname === nickname) {
      delete editProfileRequest.nickname;
    }

    if (profileData?.profileImg === profileImgSrc || !profileImg) {
      delete editProfileRequest.profileImg;
    }

    if (!editProfileRequest.nickname && !editProfileRequest.profileImg) {
      alert('변경된 사항이 없습니다.');
      return;
    }

    console.log(editProfileRequest);

    const response = await editProfile(editProfileRequest);
    if (response.status === HttpStatusCode.Ok) {
      alert('프로필 수정이 완료되었습니다.');
      setProfileImgStore(response.profileImg);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      Router.back();
    } else {
      alert('프로필 수정에 실패했습니다.');
    }
  };

  if (profileLoading) {
    return <div>Loading...</div>;
  }
  if (profileError) {
    return <div>Error: 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <Flex
      css={css`
        width: 100%;
        padding: 20px;
      `}
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        css={css`
          width: 120px;
          height: 120px;
          margin-bottom: 20px;
          position: relative;
        `}
        justifyContent='center'
        alignItems='center'
      >
        <Flex
          css={css`
            width: 100px;
            height: 100px;
            border-radius: 100%;
            position: relative;
            overflow: hidden;
          `}
        >
          <Image src={profileImgSrc} fill alt='profile-image' />
        </Flex>
        <FontAwesomeIcon
          icon={faCamera}
          role='button'
          onClick={() => inputRef.current?.click()}
          css={css`
            position: absolute;
            bottom: 3px;
            right: 10px;
            background-color: white;
            border-radius: 50%;
            padding: 5px;
            border: 1px solid black;
            cursor: pointer;
          `}
        />
      </Flex>
      <Input
        width={0}
        height={0}
        type='file'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setProfileImg(file);
            setProfileImgSrc(URL.createObjectURL(file));
          }
        }}
        css={css`
          display: none;
        `}
        ref={inputRef}
      />
      <Input label='닉네임' placeholder='닉네임' value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Flex
        css={css`
          width: 100%;
          margin-top: 20px;
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
          onClick={handleClickEdit}
          color='primary'
          css={css`
            width: 50%;
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
            border-radius: 5px;
          `}
        >
          변경하기
        </StandardButton>
      </Flex>
    </Flex>
  );
}

Profile.layout = (page: React.ReactNode) => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='프로필 설정'>{page}</Layout.Content>
  </Layout>
);

export default Profile;
