import { css } from '@emotion/react';
import { InputHTMLAttributes, forwardRef } from 'react';
import Label from '~/shared/components/label';
import toPixelString from '~/shared/styles/toPixelString';
import colors from '~/shared/styles/colors';
import Flex from '../flex';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
  labelColor?: string;
  width?: number | string;
  height?: number | string;
  value?: string | number;
  defaultValue?: string | number;
  // eslint-disable-next-line
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = {
  container: (width?: number | string, height?: number | string) => css`
    width: ${width ? toPixelString(width) : '100%'};
    height: ${height ? toPixelString(height) : 'auto'};
  `,
  input: css`
    padding: 8px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    background-color: white;
    font-size: 1rem;
    outline: none;
    width: 100%;
    height: 40px;
  `,
  disabled: css`
    background-color: ${colors.disabled100};
    color: black;
  `
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hideLabel, labelColor = 'black', disabled, width = '100%', height, type = 'text', ...props }, ref) => (
    <Flex direction='column' alignItems='flex-start' rowGap='12px' style={{ width: '100%' }}>
      {!hideLabel && <Label text={label} fontSize='1rem' color={labelColor} />}
      <div css={styles.container(width, height)}>
        <input ref={ref} css={[styles.input, disabled && styles.disabled]} type={type} disabled={disabled} {...props} />
      </div>
    </Flex>
  )
);
Input.displayName = 'Input';

export default Input;
