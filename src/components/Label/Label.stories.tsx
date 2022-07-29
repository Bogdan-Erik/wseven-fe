import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Label, LabelProps } from './Label'
import docs from './Label.docs.mdx'

export default {
  title: 'Forms/Label',
  component: Label,
  parameters: {
    docs: { page: docs },
  },
} as Meta

const Template: Story<LabelProps> = (args) => <Label {...args} />

export const Standard = Template.bind({})
Standard.args = {
  children: 'Felhasználói név',
}

export const Required = Template.bind({})
Required.args = {
  children: 'Felhasználói név',
  required: true
}
