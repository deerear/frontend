import { css } from '@emotion/react';

import { type ButtonHTMLAttributes, forwardRef } from 'react';

import colors from '~/shared/styles/colors';

import type { Color } from '../types';

type Props = {
  color: Color | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  container: ({ color }: { color: Color }) => css`
    color: ${colors.neutral0};
    border: none;
    background-color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500
    }[color]};

    ${{
      primary: css`
        background-color: ${colors.primary900};

        :hover {
          background-color: ${colors.primary800};
        }

        :active {
          background-color: ${colors.primary700};
        }
      `,
      neutral: css`
        background-color: ${colors.neutral500};

        :hover {
          background-color: ${colors.neutral600};
        }

        :active {
          background-color: ${colors.neutral700};
        }
      `
    }[color]};

    :disabled {
      background-color: ${colors.disabled100};
      color: ${colors.disabled500};
    }
  `
};

const StandardButton = forwardRef<HTMLButtonElement, Props>(({ color = 'primary', type = 'button', ...props }, ref) => (
  <button css={styles.container({ color })} type={type === 'submit' ? 'submit' : 'button'} {...props} ref={ref} />
));

StandardButton.displayName = 'StandardButton';

export default StandardButton;
