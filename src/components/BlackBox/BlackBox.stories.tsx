import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { BlackBox, BlackBoxProps } from './BlackBox'
import docs from './BlackBox.docs.mdx'

export default {
  title: 'Components/BlackBox',
  component: BlackBox,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<BlackBoxProps> = (args) => <BlackBox {...args} />

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
