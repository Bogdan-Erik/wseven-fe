import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Icons, IconsProps } from './Icons'
import docs from './Icons.docs.mdx'

export default {
  title: 'Components/Icons',
  component: Icons,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<IconsProps> = (args) => <Icons {...args} />

export const Standard = Template.bind({})
Standard.args = {
  size: '8xl',

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
