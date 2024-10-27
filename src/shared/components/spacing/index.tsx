import { css } from '@emotion/react';

import toPixelString from '~/shared/styles/toPixelString';
import type { PixelValue } from '~/shared/styles/types';

type Props = {
  direction: 'vertical' | 'horizontal';
  size: PixelValue;
};

const styles = {
  container: ({ direction, size }: { direction: 'vertical' | 'horizontal'; size: PixelValue }) => css`
    ${direction === 'horizontal' &&
    css`
      width: ${toPixelString(size)};
    `};

    ${direction === 'vertical' &&
    css`
      height: ${toPixelString(size)};
    `};
  `
};

function Spacing({ direction, size }: Props) {
  return <div css={styles.container({ direction, size })} />;
}

export default Spacing;
