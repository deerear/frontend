import type { Meta, StoryObj } from '@storybook/react';
import colors from '~/shared/styles/colors';
import StackComponent from '.';

const meta: Meta<typeof StackComponent> = {
  title: 'components/Stack',
  component: StackComponent,
  parameters: { controls: { exclude: ['direction', 'selector', 'style'] } },
  args: {
    spacing: 20,
    alignItems: 'normal',
    justifyContent: 'flex-start',
    style: {
      width: '500px',
      height: '300px',
      backgroundColor: colors.neutral100
    }
  },
  argTypes: {
    spacing: { options: [20, 40, 60], control: { type: 'radio' } },
    alignItems: {
      options: ['normal', 'stretch', 'center', 'flex-start', 'flex-end', 'start', 'end', 'baseline'],
      control: {
        type: 'radio'
      }
    },
    justifyContent: {
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      control: {
        type: 'radio'
      }
    }
  },
  render: (args) => (
    <StackComponent {...args}>
      <div style={{ width: 'fit-content', height: 'fit-content', backgroundColor: colors.neutral0 }}>item1</div>
      <div style={{ width: 'fit-content', height: 'fit-content', backgroundColor: colors.neutral0 }}>item2</div>
      <div style={{ width: 'fit-content', height: 'fit-content', backgroundColor: colors.neutral0 }}>item3</div>
    </StackComponent>
  )
};

export default meta;

type Story = StoryObj<typeof StackComponent>;

export const Horizontal: Story = {
  args: { direction: 'horizontal' }
};

export const Vertical: Story = {
  args: { direction: 'vertical' }
};
