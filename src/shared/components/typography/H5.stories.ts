import type { Meta, StoryObj } from '@storybook/react';
import { H5 } from '.';

const meta: Meta<typeof H5> = {
  title: 'components/Typography',
  component: H5,
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

type Story = StoryObj<typeof H5>;

export const Heading5: Story = {
  args: {
    children: 'This is a Heading 1',
    color: '#000'
  }
};
