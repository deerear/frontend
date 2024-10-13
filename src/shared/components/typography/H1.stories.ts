import type { Meta, StoryObj } from '@storybook/react';
import { H1 } from '.';

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
