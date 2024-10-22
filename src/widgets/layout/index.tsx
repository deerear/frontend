import { ReactNode } from 'react';

import Header from './header';
import Content from './content';

type Props = { children: ReactNode };

const LayoutComponent = (props: Props) => {
  return props.children;
};

type LayoutType = typeof LayoutComponent & { Header: typeof Header; Content: typeof Content };

const Layout: LayoutType = LayoutComponent as LayoutType;
Layout.Header = Header;
Layout.Content = Content;

LayoutComponent.displayName = 'LayoutComponent';

export default Layout;
