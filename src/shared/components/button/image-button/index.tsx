/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import Image, { type StaticImageData } from 'next/image';

type Props = {
  src: StaticImageData | string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyle = ({ width, height }: { width?: number | string; height?: number | string }) => css`
  border: none;
  padding: 0;
  background: none;
  width: ${typeof width === 'number' ? `${width}px` : width || 'auto'};
  height: ${typeof height === 'number' ? `${height}px` : height || 'auto'};
  position: relative;
  display: inline-block;
`;

const ImageButton = forwardRef<HTMLButtonElement, Props>(
  ({ src, alt = '', width = 50, height = 50, priority = false, ...props }, ref) => (
    <button ref={ref} css={buttonStyle({ width, height })} type='button' {...props}>
      <Image src={src} alt={alt} layout='fill' objectFit='contain' priority={priority} />
    </button>
  )
);

ImageButton.displayName = 'ImageButton';

export default ImageButton;
