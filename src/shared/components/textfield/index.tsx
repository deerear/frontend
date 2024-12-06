import { css } from '@emotion/react';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import toPixelString from '~/shared/styles/toPixelString';
import colors from '~/shared/styles/colors';
import Flex from '../flex';
import Label from '../label';

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hideLabel?: boolean;
  labelColor?: string;
  width?: number | string;
  height?: number | string;
  value?: string;
  defaultValue?: string;
  // eslint-disable-next-line
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const styles = {
  container: (width?: number | string, height?: number | string) => css`
    width: ${width ? toPixelString(width) : '100%'};
    height: ${height ? toPixelString(height) : 'auto'};
  `,
  textarea: css`
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: none;
    outline: none;
    resize: vertical;
    background-color: white;
    border: 1px solid #c4c4c4;
    padding: 8px;
    border-radius: 10px;
  `,
  disabled: css`
    background-color: ${colors.disabled100};
    color: black;
  `
};

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ label, hideLabel, labelColor = 'black', disabled, width, height, value, onChange, ...props }, ref) => (
    <Flex direction='column' alignItems='flex-start' rowGap='12px'>
      {!hideLabel && <Label text={label} fontSize='1.25rem' color={labelColor} />}
      <textarea
        ref={ref}
        css={[styles.container(width, height), styles.textarea, disabled && styles.disabled]}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Flex>
  )
);

TextField.displayName = 'TextField';

export default TextField;
