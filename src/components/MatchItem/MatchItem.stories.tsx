import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { MatchItem, MatchItemProps } from './MatchItem'
import docs from './MatchItem.docs.mdx'

export default {
  title: 'Components/MatchItem',
  component: MatchItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<MatchItemProps> = (args) => <MatchItem {...args} />

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
