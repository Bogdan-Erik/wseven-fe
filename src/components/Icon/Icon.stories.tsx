import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Icon, IconProps } from './Icon'
import docs from './Icon.docs.mdx'

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<IconProps> = (args) => <Icon {...args} />

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
