import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { IconBadge, IconBadgeProps } from './IconBadge'
import docs from './IconBadge.docs.mdx'

export default {
  title: 'Components/IconBadge',
  component: IconBadge,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<IconBadgeProps> = (args) => <IconBadge {...args} />

export const Standard = Template.bind({})
Standard.args = {
  children: <><span className="text-white font-icomoon icon icon-football text-3xl"></span></>
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
