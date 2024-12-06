import { css } from '@emotion/react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import colors from '~/shared/styles/colors';
import type { Color } from '../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
}

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

const OutlinedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'primary', type = 'button', ...props }, ref) => (
    <button css={styles.container({ color })} type={type === 'submit' ? 'submit' : 'button'} {...props} ref={ref} />
  )
);

OutlinedButton.displayName = 'OutlinedButton';

export default OutlinedButton;
