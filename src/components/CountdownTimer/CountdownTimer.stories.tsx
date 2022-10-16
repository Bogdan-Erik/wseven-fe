import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { CountdownTimer, CountdownTimerProps } from './CountdownTimer'
import docs from './CountdownTimer.docs.mdx'

export default {
  title: 'Components/CountdownTimer',
  component: CountdownTimer,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<CountdownTimerProps> = (args) => <CountdownTimer {...args} />

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
