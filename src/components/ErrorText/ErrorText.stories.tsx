import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ErrorText, ErrorTextProps } from './ErrorText'
import docs from './ErrorText.docs.mdx'

export default {
  title: 'Forms/ErrorText',
  component: ErrorText,
  parameters: {
    docs: { page: docs },
  },
} as Meta

const Template: Story<ErrorTextProps> = (args) => <ErrorText {...args} />

export const Standard = Template.bind({})
Standard.args = {
  children: 'Error text',
}
