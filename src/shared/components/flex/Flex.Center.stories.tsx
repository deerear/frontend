import type { Meta, StoryObj } from '@storybook/react';
import colors from '~/shared/styles/colors';
import Flex from '.';

const meta: Meta<typeof Flex.Center> = {
  title: 'components/Flex/Center',
  component: Flex.Center,
  parameters: { controls: { exclude: ['children', 'style'] } },
  args: {
    children: <div style={{ backgroundColor: colors.neutral0, width: 'fit-content', height: 'fit-content' }}>item</div>,
    style: {
      width: '500px',
      height: '300px',
      backgroundColor: colors.neutral100
    }
  },
  argTypes: {}
};
export default meta;

type Story = StoryObj<typeof Flex.Center>;

export const Center: Story = {};
