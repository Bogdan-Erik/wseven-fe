import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { BankItem, BankItemProps } from './BankItem'
import docs from './BankItem.docs.mdx'

export default {
  title: 'Components/BankItem',
  component: BankItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<BankItemProps> = (args) => <BankItem {...args} />

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
