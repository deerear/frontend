import { css } from '@emotion/react';
import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Flex from '../flex';
import Button from '../button';
import Label from '../label';

const styles = {
  input: css`
    flex: 1;
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
  handleSearchClick: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ label, handleSearchClick }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleButtonClick = () => {
    handleSearchClick(value);
  };

  return (
    <Flex direction='column' rowGap='10px'>
      <Label text={label} />
      <Flex direction='row' alignItems='center' columnGap='5px'>
        <input type='text' placeholder={label} value={value} onChange={handleInputChange} css={styles.input} />
        <Button
          variant='outlined'
          color='primary'
          size='medium'
          onClick={handleButtonClick}
          aria-label='검색'
          css={styles.button}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default SearchInput;
