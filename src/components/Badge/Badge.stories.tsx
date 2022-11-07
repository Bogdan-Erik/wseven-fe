import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Badge, BadgeProps } from './Badge'
import docs from './Badge.docs.mdx'

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<BadgeProps> = (args) => <Badge {...args} />

export const Standard = Template.bind({})
Standard.args = {

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
