import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { TransactionRow, TransactionRowProps } from './TransactionRow'
import docs from './TransactionRow.docs.mdx'

export default {
  title: 'Components/TransactionRow',
  component: TransactionRow,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<TransactionRowProps> = (args) => <TransactionRow {...args} />

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
