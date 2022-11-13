import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { InformationItem, InformationItemProps } from './InformationItem'
import docs from './InformationItem.docs.mdx'

export default {
  title: 'Components/InformationItem',
  component: InformationItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<InformationItemProps> = (args) => <InformationItem {...args} />

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
