/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Flex from '../flex';
import Button from '../button';
import Label from '../label';

const styles = {
  input: css`
    flex: 1;
    width: 100%;
    height: 40px;
    padding: 0 8px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
  `,
  button: css`
    height: 40px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  `
};

interface SearchInputProps {
  label: string;
  value: string;
  // eslint-disable-next-line
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: () => void;
}

function SearchInput({ label, value, onChange, handleSearchClick }: SearchInputProps) {
  return (
    <Flex
      direction='column'
      rowGap='10px'
      css={css`
        width: 100%;
      `}
    >
      <Label text={label} fontSize='1rem' />
      <Flex direction='row' alignItems='center' columnGap='5px' style={{ width: '100%' }}>
        <input type='text' placeholder={label} value={value} onChange={onChange} css={styles.input} />
        <Button
          variant='outlined'
          color='primary'
          size='medium'
          onClick={handleSearchClick}
          aria-label='검색'
          css={styles.button}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Flex>
    </Flex>
  );
}

export default SearchInput;
