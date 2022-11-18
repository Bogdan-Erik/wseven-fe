import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Loader, LoaderProps } from './Loader'
import docs from './Loader.docs.mdx'

export default {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<LoaderProps> = (args) => <Loader {...args} />

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
