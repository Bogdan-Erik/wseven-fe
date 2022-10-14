import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { MobileMenuBar, MobileMenuBarProps } from './MobileMenuBar'
import docs from './MobileMenuBar.docs.mdx'

export default {
  title: 'Components/MobileMenuBar',
  component: MobileMenuBar,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<MobileMenuBarProps> = (args) => <MobileMenuBar {...args} />

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
