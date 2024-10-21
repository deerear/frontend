import { css, SerializedStyles } from '@emotion/react';

import toPixelString from './toPixelString';
import type { PixelValue } from './types';

const gutter: {
  // eslint-disable-next-line no-unused-vars
  vertical: (spacing: PixelValue, selector?: string) => SerializedStyles;
  // eslint-disable-next-line no-unused-vars
  horizontal: (spacing: PixelValue, selector?: string) => SerializedStyles;
} = {
  vertical: (spacing: PixelValue, selector: string = '*:not(style)') =>
    // eslint-disable-next-line no-unused-vars
    css`
      & > ${selector} ~ ${selector} {
        margin-top: ${toPixelString(spacing)};
      }
    `,
  horizontal: (spacing: PixelValue, selector: string = '*:not(style)') => css`
    & > ${selector} ~ ${selector} {
      margin-left: ${toPixelString(spacing)};
    }
  `
};

export default gutter;
