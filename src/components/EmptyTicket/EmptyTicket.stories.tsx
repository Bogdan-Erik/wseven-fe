import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { EmptyTicket, EmptyTicketProps } from './EmptyTicket'
import docs from './EmptyTicket.docs.mdx'

export default {
  title: 'Components/EmptyTicket',
  component: EmptyTicket,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<EmptyTicketProps> = (args) => <EmptyTicket {...args} />

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
