import { css } from '@emotion/react';

import Avatar from '~/shared/components/avatar';

import flex from '~/shared/styles/flex';
import spacing from '~/shared/styles/spacing';

type Props = {};

const styles = {
  container: css`
    position: absolute;
    top: 0px;
    ${flex.display};
    ${flex.alignItems('center')};
    ${flex.justifyContent('space-between')};
    height: 54px;
    width: 100%;
    ${spacing.padding.x20};
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);

    .brand {
    }
  `
};

const Header = (props: Props) => {
  return (
    <header css={styles.container}>
      <div className='brand'>Dearear</div>
      <Avatar />
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
