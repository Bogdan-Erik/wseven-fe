import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Header, HeaderProps } from './Header'
import docs from './Header.docs.mdx'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const Standard = Template.bind({})
Standard.argTypes = {
  variant: {
    options: ['primary', 'secondary', 'tertiary'],
    control: { type: 'radio' },
  }
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
