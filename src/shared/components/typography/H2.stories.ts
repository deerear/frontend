import type { Meta, StoryObj } from '@storybook/react';
import { H2 } from '.';

const meta: Meta<typeof H2> = {
  title: 'components/Typography',
  component: H2,
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

type Story = StoryObj<typeof H2>;

export const Heading2: Story = {
  args: {
    children: 'This is a Heading 2',
    color: '#000'
  }
};
