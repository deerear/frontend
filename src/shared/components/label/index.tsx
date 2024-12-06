import React from 'react';
import { css, SerializedStyles } from '@emotion/react';

interface LabelProps {
  text?: string;
  fontSize?: string;
  color?: string;
  htmlFor?: string;
  css?: SerializedStyles; // css prop 추가
  children?: React.ReactNode;
}

function Label({ text, fontSize = '16px', color = 'black', htmlFor, css: customCss, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      css={[
        css`
          font-size: ${fontSize};
          color: ${color};
        `,
        customCss
      ]}
    >
      {text || children}
    </label>
  );
}

export default Label;
