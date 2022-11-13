import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { NewsItem, NewsItemProps } from './NewsItem'
import docs from './NewsItem.docs.mdx'

export default {
  title: 'Components/NewsItem',
  component: NewsItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<NewsItemProps> = (args) => <NewsItem {...args} />

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
