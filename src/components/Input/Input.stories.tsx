import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Input, InputProps } from './Input'
import docs from './Input.docs.mdx'

export default {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />

export const Standard = Template.bind({})
Standard.args = {
  name: 'email',
  placeholder: 'Add meg az e-mail címed'
}

export const Password = Template.bind({})
Password.args = {
  name: 'password',
  type: 'password',
  placeholder: 'Add meg a jelszavad'
}

export const Error = Template.bind({})
Error.args = {
  name: 'password',
  type: 'password',
  error: 'password is invalid'
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: 'password',
  type: 'password',
  disabled: true
}
