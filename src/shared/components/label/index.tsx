/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Label = ({ text = '', fontSize = '16px', color = 'black' }) => {
  const labelStyle = css`
    font-size: ${fontSize};
    color: ${color};
  `;

  return <label css={labelStyle}>{text}</label>;
};

export default Label;
