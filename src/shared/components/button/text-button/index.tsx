import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import colors from '~/shared/styles/colors';
import type { Color } from '../types';

type Props = { color: Color | undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

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

const TextButton = forwardRef<HTMLButtonElement, Props>(({ color = 'primary', type = 'button', ...props }, ref) => (
  <button ref={ref} css={styles.container({ color })} type={type === 'submit' ? 'submit' : 'button'} {...props} />
));
TextButton.displayName = 'TextButton';

export default TextButton;
