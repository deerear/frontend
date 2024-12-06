import { css } from '@emotion/react';
import { ReactNode, FC } from 'react';

const commonStyles = (color: string) => css`
  color: ${color};
`;

const h1Styles = (color: string) => css`
  ${commonStyles(color)};
  font-size: 2.5rem;
  font-weight: bold;
`;

const h2Styles = (color: string) => css`
  ${commonStyles(color)};
  font-size: 2rem;
  font-weight: bold;
`;

const h3Styles = (color: string) => css`
  ${commonStyles(color)};
  font-size: 1.75rem;
  font-weight: bold;
`;

const h4Styles = (color: string) => css`
  ${commonStyles(color)};
  font-size: 1.5rem;
  font-weight: bold;
`;

const h5Styles = (color: string) => css`
  ${commonStyles(color)};
  font-size: 1.25rem;
  font-weight: bold;
`;

interface TypographyProps {
  children: ReactNode;
  color?: string;
}

export const H1: FC<TypographyProps> = function H1({ children, color = '#000' }) {
  return <h1 css={h1Styles(color)}>{children}</h1>;
};

export const H2: FC<TypographyProps> = function H2({ children, color = '#000' }) {
  return <h2 css={h2Styles(color)}>{children}</h2>;
};

export const H3: FC<TypographyProps> = function H3({ children, color = '#000' }) {
  return <h3 css={h3Styles(color)}>{children}</h3>;
};

export const H4: FC<TypographyProps> = function H4({ children, color = '#000' }) {
  return <h4 css={h4Styles(color)}>{children}</h4>;
};

export const H5: FC<TypographyProps> = function H5({ children, color = '#000' }) {
  return <h5 css={h5Styles(color)}>{children}</h5>;
};
