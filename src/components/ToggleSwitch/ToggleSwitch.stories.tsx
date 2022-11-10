import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ToggleSwitch, ToggleSwitchProps } from './ToggleSwitch'
import docs from './ToggleSwitch.docs.mdx'

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<ToggleSwitchProps> = (args) => <ToggleSwitch {...args} />

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
