import type { Meta, StoryObj } from '@storybook/react';
import colors from '~/shared/styles/colors';
import Flex from '.';

const meta: Meta<typeof Flex.CenterVertical> = {
  title: 'components/Flex/CenterVertical',
  component: Flex.CenterVertical,
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

type Story = StoryObj<typeof Flex.CenterVertical>;

export const CenterVertical: Story = {};
