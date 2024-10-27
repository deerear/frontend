import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import { css } from '@emotion/react';
import gutter from '~/shared/styles/gutter';
import type { PixelValue } from '~/shared/styles/types';
import Flex from '../flex';
import Item from './item';

type Props = {
  direction: 'vertical' | 'horizontal';
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  selector?: string;
  spacing?: PixelValue;
} & HTMLAttributes<HTMLDivElement>;

const styles = {
  container: ({
    direction,
    spacing,
    selector
  }: {
    direction: 'vertical' | 'horizontal';
    spacing: PixelValue | undefined;
    selector: string | undefined;
  }) => css`
    ${spacing && direction === 'vertical' && gutter.vertical(spacing, selector)};

    ${spacing && direction === 'horizontal' && gutter.horizontal(spacing, selector)};
  `
};

const StackComponent = forwardRef<HTMLDivElement, Props>(
  ({ alignItems = 'stretch', justifyContent = 'flex-start', ...props }: Props, ref) => {
    const { direction: propsDirection, spacing: propsSpacing, selector: propsSelector, ...restProps } = props;

    return (
      <Flex
        css={styles.container({
          direction: propsDirection,
          spacing: propsSpacing,
          selector: propsSelector
        })}
        ref={ref}
        direction={propsDirection === 'vertical' ? 'column' : 'row'}
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...restProps}
      />
    );
  }
);

StackComponent.displayName = 'StackComponent';

const Stack = StackComponent as typeof StackComponent & { Item: typeof Item };
Stack.Item = Item;

export default Stack;
