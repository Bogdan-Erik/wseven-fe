import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ChallengeHeader, ChallengeHeaderProps } from './ChallengeHeader'
import docs from './ChallengeHeader.docs.mdx'

export default {
  title: 'Components/ChallengeHeader',
  component: ChallengeHeader,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<ChallengeHeaderProps> = (args) => <ChallengeHeader {...args} />

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
