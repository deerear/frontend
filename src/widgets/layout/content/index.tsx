import { css } from '@emotion/react';
import { type ReactNode } from 'react';
import { useRouter } from 'next/router';

import spacing from '~/shared/styles/spacing';
import gutter from '~/shared/styles/gutter';

type Props = { children: ReactNode; padding?: boolean; page?: string };

const styles = {
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

const Content = ({ padding = true, ...props }: Props) => {
  const router = useRouter();

  return (
    <main css={styles.container({ padding, hasNavigation: !!props.page })}>
      {props.page && (
        <div className='navigation'>
          <span onClick={router.back} className='back-button' role='button'>
            &lt;
          </span>
          <span className='page'>{props.page}</span>
        </div>
      )}
      {props.children}
    </main>
  );
};

Content.displayName = 'Content';

export default Content;
