import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { DataPaginator, DataPaginatorProps } from './DataPaginator'
import docs from './DataPaginator.docs.mdx'

export default {
  title: 'Components/DataPaginator',
  component: DataPaginator,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<DataPaginatorProps> = (args) => <DataPaginator {...args} />

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
