import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { BetRow, BetRowProps } from './BetRow'
import docs from './BetRow.docs.mdx'

export default {
  title: 'Components/BetRow',
  component: BetRow,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<BetRowProps> = (args) => <BetRow {...args} />

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
