import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Modal, ModalProps } from './Modal'
import docs from './Modal.docs.mdx'

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<ModalProps> = (args) => <Modal {...args} />

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
