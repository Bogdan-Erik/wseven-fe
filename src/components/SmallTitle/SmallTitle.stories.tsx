import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SmallTitle, SmallTitleProps } from './SmallTitle'
import docs from './SmallTitle.docs.mdx'

export default {
  title: 'Components/SmallTitle',
  component: SmallTitle,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<SmallTitleProps> = (args) => <SmallTitle {...args} />

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
