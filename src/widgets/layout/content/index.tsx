import { css } from '@emotion/react';
import { type ReactNode } from 'react';
import { useRouter } from 'next/router';

import spacing from '~/shared/styles/spacing';
import gutter from '~/shared/styles/gutter';

type Props = { children: ReactNode; padding?: boolean; path?: string };

const Content = ({ padding = true, ...props }: Props) => {
  const router = useRouter();

  return (
    <main css={styles.container({ padding, hasNavigation: !!props.path })}>
      {props.path && (
        <div className='navigation'>
          <span onClick={router.back} className='back-button' role='button'>
            &lt;
          </span>
          <span className='path'>{props.path}</span>
        </div>
      )}
      {props.children}
    </main>
  );
};

const styles = {
  container: ({ padding, hasNavigation }: { padding: boolean; hasNavigation: boolean }) => css`
    ${padding &&
    css`
      ${spacing.padding.x10};
      ${spacing.padding.bottom10};
      ${spacing.padding.top(hasNavigation ? 54 : 64)};
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

export default Content;
