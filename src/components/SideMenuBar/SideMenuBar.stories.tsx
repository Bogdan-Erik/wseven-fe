import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SideMenuBar, SideMenuBarProps } from './SideMenuBar'
import docs from './SideMenuBar.docs.mdx'

export default {
  title: 'Components/SideMenuBar',
  component: SideMenuBar,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<SideMenuBarProps> = (args) => <SideMenuBar {...args} />

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
