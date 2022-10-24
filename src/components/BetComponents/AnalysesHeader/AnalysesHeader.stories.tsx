import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AnalysesHeader, AnalysesHeaderProps } from './AnalysesHeader'
import docs from './AnalysesHeader.docs.mdx'

export default {
  title: 'Components/AnalysesHeader',
  component: AnalysesHeader,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<AnalysesHeaderProps> = (args) => <AnalysesHeader {...args} />

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
