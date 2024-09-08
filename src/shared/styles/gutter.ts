import { css, SerializedStyles } from '@emotion/react';

import toPixelString from './toPixelString';
import type { PixelValue } from './types';

const gutter: {
  vertical: (spacing: PixelValue, selector?: string) => SerializedStyles;
  horizontal: (spacing: PixelValue, selector?: string) => SerializedStyles;
} = {
  vertical: (spacing: PixelValue, selector: string = '*:not(style)') => {
    return css`
      & > ${selector} ~ ${selector} {
        margin-top: ${toPixelString(spacing)};
      }
    `;
  },
  horizontal: (spacing: PixelValue, selector: string = '*:not(style)') => css`
    & > ${selector} ~ ${selector} {
      margin-left: ${toPixelString(spacing)};
    }
  `
};

export default gutter;
