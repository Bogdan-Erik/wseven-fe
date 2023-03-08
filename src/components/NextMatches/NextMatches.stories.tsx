import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { NextMatches, NextMatchesProps } from './NextMatches'
import docs from './NextMatches.docs.mdx'

export default {
  title: 'Components/NextMatches',
  component: NextMatches,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<NextMatchesProps> = (args) => <NextMatches {...args} />

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
