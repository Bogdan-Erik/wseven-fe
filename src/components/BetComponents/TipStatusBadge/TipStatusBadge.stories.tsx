import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { TipStatusBadge, TipStatusProps } from './TipStatusBadge'
import docs from './TipStatusBadge.docs.mdx'

export default {
  title: 'Components/TipStatusBadge',
  component: TipStatusBadge,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<TipStatusProps> = (args) => <TipStatusBadge {...args} />

export const Standard = Template.bind({})
Standard.args = {
 // odds: '1.68'
}

/* Standard.decorators = [
  (Story) => (
    <div>
      <Story />
    </div>
  ),
]*/
/* Standard.parameters = {
  backgrounds: {
    default: 'blue',
  },
}*/
