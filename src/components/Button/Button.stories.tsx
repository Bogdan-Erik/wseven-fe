import React from 'react'
//import { Story, Meta } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './Button'
import docs from './Button.docs.mdx'
import { Story, ComponentMeta } from '@storybook/react';

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
} as  ComponentMeta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary button',
  primary: true,
  size: 'large',
  disabled: false,
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Button',
};

