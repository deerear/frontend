import type { Meta, StoryObj } from '@storybook/react';
import { H3 } from '.';

const meta: Meta<typeof H3> = {
  title: 'components/Typography',
  component: H3,
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

type Story = StoryObj<typeof H3>;

export const Heading3: Story = {
  args: {
    children: 'This is a Heading 3',
    color: '#000'
  }
};
