import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { OddsItem, OddsItemProps } from './OddsItem'
import docs from './OddsItem.docs.mdx'

export default {
  title: 'Components/OddsItem',
  component: OddsItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<OddsItemProps> = (args) => <OddsItem {...args} />

export const Standard = Template.bind({})
Standard.args = {
  odds: '1.68'
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
