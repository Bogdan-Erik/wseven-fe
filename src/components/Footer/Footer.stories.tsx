import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Footer, FooterProps } from './Footer'
import docs from './Footer.docs.mdx'

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<FooterProps> = (args) => <Footer {...args} />

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
