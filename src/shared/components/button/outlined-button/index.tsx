import { css } from '@emotion/react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import colors from '~/shared/styles/colors';

import type { Color } from '../types';

type Props = {
  color: Color | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const OutlinedButton = forwardRef<HTMLButtonElement, Props>(({ color = 'primary', ...props }, ref) => {
  return <button css={styles.container({ color })} {...props} ref={ref} />;
});

const styles = {
  container: ({ color }: { color: Color }) => css`
    box-sizing: border-box;
    color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500
    }[color]};
    background-color: ${colors.neutral0};
    border-width: 1px;
    border-style: solid;
    border-color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500
    }[color]};
    border-radius: 5px;

    :hover {
      background-color: ${colors.neutral100};
    }

    :active {
      background-color: ${colors.neutral200};
    }

    :disabled {
      color: ${colors.disabled500};
      border-color: ${colors.disabled500};
      background-color: ${colors.disabled100};
    }
  `
};

export default OutlinedButton;
