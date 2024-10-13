import type { Meta, StoryObj } from '@storybook/react';
import { H1, H2, H3, H4, H5 } from '.';

const meta: Meta<typeof H1> = {
  title: 'components/Typography',
  component: H1,
  args: {
    children: 'This is a heading',
    color: '#000'
  },
  argTypes: {
    children: { control: { type: 'text' } },
    color: { control: { type: 'color' } }
  }
};
export default meta;

type Story = StoryObj<typeof H1>;

export const Heading1: Story = {
  args: {
    children: 'This is a Heading 1',
    color: '#000'
  }
};

export const Heading2: Story = {
  args: {
    children: 'This is a Heading 2',
    color: '#333'
  }
};

export const Heading3: Story = {
  args: {
    children: 'This is a Heading 3',
    color: '#666'
  }
};

export const Heading4: Story = {
  args: {
    children: 'This is a Heading 4',
    color: '#999'
  }
};

export const Heading5: Story = {
  args: {
    children: 'This is a Heading 5',
    color: '#ccc'
  }
};
