import { css } from '@emotion/react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import colors from '~/shared/styles/colors';

type Props = {
  color?: 'primary' | 'neutral';
  rounded: boolean | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StandardButton = forwardRef<HTMLButtonElement, Props>(({ color = 'primary', rounded = false, ...props }, ref) => {
  return <button css={styles.container({ color, rounded, disabled: props.disabled })} {...props} ref={ref} />;
});

const styles = {
  container: ({
    color,
    rounded,
    disabled
  }: {
    color: 'primary' | 'neutral';
    rounded: boolean;
    disabled: boolean | undefined;
  }) => css`
    color: ${colors.neutral0};
    border: none;
    border-radius: 5px;
    background-color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500
    }[color]};

    ${rounded &&
    css`
      border-radius: 25px;
    `};

    ${disabled &&
    css`
      background-color: ${colors.disabled100};
      color: ${colors.disabled500};
    `};
  `
};

export default StandardButton;
