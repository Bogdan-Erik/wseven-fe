import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { BugTracker, BugTrackerProps } from './BugTracker'
import docs from './BugTracker.docs.mdx'

export default {
  title: 'Components/BugTracker',
  component: BugTracker,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<BugTrackerProps> = (args) => <BugTracker {...args} />

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
