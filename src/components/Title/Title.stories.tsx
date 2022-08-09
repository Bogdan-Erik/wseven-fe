import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Title, TitleProps } from './Title'
import docs from './Title.docs.mdx'

export default {
  title: 'Components/Title',
  component: Title,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<TitleProps> = (args) => <Title {...args} />

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
