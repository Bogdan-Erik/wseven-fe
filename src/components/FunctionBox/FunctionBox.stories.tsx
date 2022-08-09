import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { FunctionBox, FunctionBoxProps } from './FunctionBox'
import docs from './FunctionBox.docs.mdx'

export default {
  title: 'Components/FunctionBox',
  component: FunctionBox,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<FunctionBoxProps> = (args) => <FunctionBox {...args} />

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
