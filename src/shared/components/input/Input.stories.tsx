import type { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  args: {
    label: 'Input Label',
    hideLabel: false,
    disabled: false,
    type: 'text',
    width: '100%',
    height: '40px',
    value: ''
  },
  argTypes: {
    label: { control: { type: 'text' } },
    hideLabel: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    type: { control: { type: 'select', options: ['text', 'checkbox', 'password', 'email'] } },
    width: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    onChange: { action: 'changed' }
  }
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const CustomSize: Story = {
  args: {
    width: '300px',
    height: '60px'
  }
};

export const NoLabel: Story = {
  args: {
    hideLabel: true
  }
};
