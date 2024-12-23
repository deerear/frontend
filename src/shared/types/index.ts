import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type Page<T = any> = NextPage<T> & {
  layout?: (page: ReactElement) => ReactNode;
};
