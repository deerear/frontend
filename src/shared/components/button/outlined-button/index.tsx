import { css } from '@emotion/react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import colors from '~/shared/styles/colors';

type Props = {
  color?: 'primary' | 'neutral';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const OutlinedButton = forwardRef<HTMLButtonElement, Props>(({ color = 'primary', ...props }, ref) => {
  return <button css={styles.container({ color, disabled: props.disabled })} {...props} ref={ref} />;
});

const styles = {
  container: ({ color, disabled }: { color: 'primary' | 'neutral'; disabled: boolean | undefined }) => css`
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

    ${disabled &&
    css`
      color: ${colors.disabled500};
      border-color: ${colors.disabled500};
      background-color: ${colors.disabled100};
    `}
  `
};

export default OutlinedButton;
