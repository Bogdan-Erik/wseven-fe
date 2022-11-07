import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SmallItemBox, SmallItemBoxProps } from './SmallItemBox'
import docs from './SmallItemBox.docs.mdx'

export default {
  title: 'Components/SmallItemBox',
  component: SmallItemBox,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<SmallItemBoxProps> = (args) => <SmallItemBox {...args} />

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
