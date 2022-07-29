import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './Button'
import docs from './Button.docs.mdx'

export default {
  title: 'Forms/Button',
  component: Button,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary button',
  primary: true,
  size: 'large',
  disabled: false,
};
export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
