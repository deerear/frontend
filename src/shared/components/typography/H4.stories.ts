import type { Meta, StoryObj } from '@storybook/react';
import { H4 } from '.';

const meta: Meta<typeof H4> = {
  title: 'components/Typography',
  component: H4,
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

type Story = StoryObj<typeof H4>;

export const Heading4: Story = {
  args: {
    children: 'This is a Heading 4',
    color: '#000'
  }
};
