import { css } from '@emotion/react';

import toPixelString from '~/shared/styles/toPixelString';
import type { PixelValue } from '~/shared/styles/types';

type Props = {
  direction: 'vertical' | 'horizontal';
  size: PixelValue;
};

const Spacing = (props: Props) => {
  return <div css={styles.container({ direction: props.direction, size: props.size })} />;
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

export default Spacing;
