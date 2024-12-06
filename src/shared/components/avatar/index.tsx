import { css } from '@emotion/react';

import toPixelString from '~/shared/styles/toPixelString';
import useAuthStore from '~/shared/store';
import type { PixelValue } from '~/shared/styles/types';
import Router from 'next/router';

type Props = {
  shape?: 'circle' | 'square';
  size?: 'small' | 'medium' | 'large' | PixelValue;
  src?: string;
  alt?: string;
};

const styles = {
  container: ({
    size,
    shape
  }: {
    size: PixelValue | ('small' | 'medium' | 'large');
    shape: 'circle' | 'square';
  }) => css`
    position: relative;
    display: inline-block;

    ${(() => {
      let width: PixelValue;

      if (size === 'small') {
        width = '20px';
      } else if (size === 'medium') {
        width = '40px';
      } else if (size === 'large') {
        width = '64px';
      } else {
        width = size;
      }

      return css`
        width: ${toPixelString(width)};
        aspect-ratio: 1;
      `;
    })()};

    overflow: hidden;
    border-radius: ${shape === 'circle' ? '50%' : '5px'};

    > img {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
      margin: auto;
      object-fit: cover;
    }
  `
};

function Avatar({ shape = 'circle', size = 'medium', ...props }: Props) {
  const { isLoggedIn } = useAuthStore();

  const handleClickAvatar = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      Router.push('/sign-in');
    } else {
      Router.push('/my-page');
    }
  };

  return (
    <span
      css={styles.container({ size, shape })}
      onKeyDown={handleClickAvatar}
      onClick={handleClickAvatar}
      tabIndex={0}
      role='button'
    >
      <img src={props.src ?? '/avatar.png'} alt={props.alt ?? 'avatar'} />
    </span>
  );
}

export default Avatar;
