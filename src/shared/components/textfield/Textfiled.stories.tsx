import type { Meta, StoryObj } from '@storybook/react';
import TextField from '.';

const meta: Meta<typeof TextField> = {
  title: 'components/TextField',
  component: TextField,
  args: {
    label: 'TextField Label',
    hideLabel: false,
    disabled: false,
    width: '100%',
    height: '100px',
    value: ''
  },
  argTypes: {
    label: { control: { type: 'text' } },
    hideLabel: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    width: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    onChange: { action: 'changed' }
  }
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const CustomSize: Story = {
  args: {
    width: '300px',
    height: '200px'
  }
};

export const NoLabel: Story = {
  args: {
    hideLabel: true
  }
};
