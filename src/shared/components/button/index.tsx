import { css } from '@emotion/react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import toPixelString from 'shared/styles/toPixelString';
import spacing from 'shared/styles/spacing';
import type { PixelValue } from 'shared/styles/types';

import StandardButton from './standard-button';
import OutlinedButton from './outlined-button';
import TextButton from './text-button';

import toPixelString from '~/shared/styles/toPixelString';
import spacing from '~/shared/styles/spacing';
import type { PixelValue } from '~/shared/styles/types';

import type { Color, Shape, Size, Variant } from './types';

type Props = {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  width?: PixelValue;
  height?: PixelValue;
  color?: Color;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'standard', size = 'medium', color = 'primary', shape = 'default', ...props }, ref) => {
    const Component = { standard: StandardButton, outlined: OutlinedButton, text: TextButton }[variant];

    return (
      <Component
        css={styles.container({
          width: props.width,
          height: props.height,
          shape,
          size
        })}
        color={color}
        {...props}
        ref={ref}
      />
    );
  }
);

const styles = {
  container: ({
    width,
    height,
    shape,
    size
  }: {
    width: PixelValue | undefined;
    height: PixelValue | undefined;
    shape: Shape;
    size: Size;
  }) => css`
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    font-size: ${{
      small: '12px',
      medium: '14px',
      large: '20px'
    }[size]};

    ${width
      ? css`
          width: ${toPixelString(width)};
        `
      : css`
          width: fit-content;
          ${{
            small: spacing.padding.x10,
            medium: spacing.padding.x20,
            large: spacing.padding.x20
          }[size]};
        `};

    ${height
      ? css`
          height: ${toPixelString(height)};
        `
      : css`
          height: fit-content;
          ${{
            small: spacing.padding.y6,
            medium: spacing.padding.y10,
            large: spacing.padding.y10
          }[size]};
        `}

    ${{
      rounded: css`
        border-radius: 25px;
      `,
      circle: css`
        border-radius: 50%;
        aspect-ratio: 1;
      `,
      default: css`
        border-radius: 5px;
      `
    }[shape]}

    :disabled {
      cursor: not-allowed;
    }
  `
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'standard', size = 'medium', color = 'primary', ...props }, ref) => {
    if (variant === 'outlined') {
      return (
        <OutlinedButton
          css={styles.container({
            width: props.width,
            height: props.height,
            size
          })}
          color={color}
          {...props}
          ref={ref}
        />
      );
    }

    const { rounded, ...restProps } = props;

    return (
      <StandardButton
        css={styles.container({
          width: props.width,
          height: props.height,
          size
        })}
        color={color}
        rounded={rounded}
        {...restProps}
        ref={ref}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
