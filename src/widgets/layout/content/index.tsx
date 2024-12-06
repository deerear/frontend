import React from 'react';

import { css } from '@emotion/react';
import { type ReactNode } from 'react';
import { useRouter } from 'next/router';

import spacing from '~/shared/styles/spacing';
import gutter from '~/shared/styles/gutter';

type Props = { children: ReactNode; padding?: boolean; page?: string };

const styles = {
  // eslint-disable-next-line
  container: ({ padding, hasNavigation }: { padding: boolean; hasNavigation: boolean }) => css`
    ${spacing.padding.top(54)};

    ${padding &&
    css`
      ${spacing.padding.x10};
      ${spacing.padding.bottom10};
    `};

    .navigation {
      ${spacing.margin.y20};
      ${gutter.horizontal(spacing.unit10)};

      .back-button {
        cursor: pointer;
      }
    }
  `
};

function Content({ padding = true, page, children }: Props) {
  const router = useRouter();

  const routerPath = router.asPath;
  const isLoginPage = routerPath === '/sign-in';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.back();
    }
  };

  return (
    <main css={styles.container({ padding, hasNavigation: !!page })}>
      {page && !isLoginPage && (
        <div className='navigation'>
          <span onClick={router.back} onKeyDown={handleKeyDown} className='back-button' role='button' tabIndex={0}>
            &lt;
          </span>
          <span className='page'>{page}</span>
        </div>
      )}
      {children}
    </main>
  );
}

Content.displayName = 'Content';

export default Content;
