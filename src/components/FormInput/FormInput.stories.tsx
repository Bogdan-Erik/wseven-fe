import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { FormInput, FormInputProps } from './FormInput'
import docs from './FormInput.docs.mdx'

export default {
  title: 'Components/FormInput',
  component: FormInput,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<FormInputProps> = (args) => <FormInput {...args} />

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
