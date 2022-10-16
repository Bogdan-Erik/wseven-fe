import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container, ContainerProps } from './Container'
import docs from './Container.docs.mdx'

export default {
  title: 'Components/Container',
  component: Container,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<ContainerProps> = (args) => <Container {...args} />

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
