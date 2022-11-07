import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ChallengeItem, ChallengeItemProps } from './ChallengeItem'
import docs from './ChallengeItem.docs.mdx'

export default {
  title: 'Components/ChallengeItem',
  component: ChallengeItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<ChallengeItemProps> = (args) => <ChallengeItem {...args} />

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
