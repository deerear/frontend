import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

type SearchInputProps = React.ComponentProps<typeof SearchInput>;

const meta: Meta<SearchInputProps> = {
  title: 'components/SearchInput',
  component: SearchInput,
  argTypes: {
    handleSearchClick: { action: 'search clicked' }
  }
};

export default meta;

type Story = StoryObj<SearchInputProps>;

export const Default: Story = {};
