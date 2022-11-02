import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { PageTitle, PageTitleProps } from './PageTitle'
import docs from './PageTitle.docs.mdx'

export default {
  title: 'Components/PageTitle',
  component: PageTitle,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<PageTitleProps> = (args) => <PageTitle {...args} />

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
