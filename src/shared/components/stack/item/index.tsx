import { css } from '@emotion/react';
import { CSSProperties, HTMLAttributes, forwardRef } from 'react';

type Props = {
  flex?: CSSProperties['flex'];
  overflow?: CSSProperties['overflow'];
} & HTMLAttributes<HTMLDivElement>;

const styles = {
  container: ({ flex, overflow }: { flex: CSSProperties['flex']; overflow: CSSProperties['overflow'] }) => css`
    flex: ${flex};
    overflow: ${overflow};
  `
};

const Item = forwardRef<HTMLDivElement, Props>(({ flex = 'auto', overflow = 'visible', ...props }, ref) => (
  <div css={styles.container({ flex, overflow })} {...props} ref={ref} />
));

Item.displayName = 'Item';

export default Item;
