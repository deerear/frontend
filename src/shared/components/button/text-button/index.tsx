import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';

import type { Color } from '../types';

import colors from '~/shared/styles/colors';

type Props = { color: Color | undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

const TextButton = forwardRef<HTMLButtonElement, Props>(({ color = 'primary', ...props }, ref) => {
  return <button ref={ref} css={styles.container({ color })} {...props} />;
});

const styles = {
  container: ({ color }: { color: Color }) => css`
    border: none;
    background-color: ${colors.neutral0};
    color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500
    }[color]};

    :hover {
      background-color: ${colors.neutral100};
    }

    :active {
      background-color: ${colors.neutral200};
    }

    :disabled {
      color: ${colors.disabled500};
      background-color: ${colors.neutral0};
    }
  `
};

export default TextButton;
