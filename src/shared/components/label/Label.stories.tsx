import type { Meta, StoryObj } from '@storybook/react';
import Label from '.';

const meta: Meta<typeof Label> = {
  title: 'components/Label',
  component: Label,
  args: {
    text: 'This is a label',
    fontSize: '1rem',
    color: '#000'
  },
  argTypes: {
    text: { control: { type: 'text' } },
    fontSize: { control: { type: 'text' } },
    color: { control: { type: 'color' } }
  }
};

export default meta;

type Story = StoryObj<typeof Label>;

export const DefaultLabel: Story = {
  args: {
    text: 'Default Label',
    fontSize: '1rem',
    color: '#000'
  }
};

export const LargeLabel: Story = {
  args: {
    text: 'Large Label',
    fontSize: '2rem',
    color: '#000'
  }
};

export const ColoredLabel: Story = {
  args: {
    text: 'Colored Label',
    fontSize: '1.25rem',
    color: '#007BFF' // Blue color
  }
};

export const SmallLabel: Story = {
  args: {
    text: 'Small Label',
    fontSize: '0.75rem',
    color: '#666'
  }
};
