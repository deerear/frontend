import type { Meta, StoryObj } from '@storybook/react';

import colors from '~/shared/styles/colors';
import ItemComponent from '.';
import Stack from '..';

const meta: Meta<typeof ItemComponent> = {
  title: 'components/Stack/Item',
  component: ItemComponent,
  parameters: { controls: { exclude: ['children'] } },
  args: { flex: 'auto', overflow: 'hidden' },
  argTypes: {
    flex: { options: ['none', 'auto'], control: { type: 'radio' } },
    overflow: {
      options: ['hidden', 'visible', 'auto'],
      control: { type: 'radio' }
    }
  },
  render: (args) => (
    <Stack
      direction='vertical'
      {...args}
      style={{
        width: '500px',
        height: '300px',
        boxSizing: 'border-box',
        padding: '10px',
        border: `1px solid ${colors.neutral900}`
      }}
    >
      <ItemComponent
        {...args}
        style={{
          backgroundColor: colors.neutral100
        }}
      >
        flex {args.flex}, overflow {args.overflow}
        <div style={{ boxSizing: 'border-box', padding: '10px' }}>
          <div style={{ height: '300px', backgroundColor: colors.neutral0 }}>item height 300px</div>
        </div>
      </ItemComponent>
      <ItemComponent
        flex='none'
        style={{
          backgroundColor: colors.neutral300
        }}
      >
        <div style={{ boxSizing: 'border-box', padding: '10px' }}>
          flex none, overflow visible
          <div style={{ height: '80px', backgroundColor: colors.neutral0 }}>item height 80px</div>
        </div>
      </ItemComponent>
    </Stack>
  )
};

export default meta;

type Story = StoryObj<typeof ItemComponent>;

export const Item: Story = {};
