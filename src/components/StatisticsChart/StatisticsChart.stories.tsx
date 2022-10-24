import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { StatisticsChart, StatisticsChartProps } from './StatisticsChart'
import docs from './StatisticsChart.docs.mdx'

export default {
  title: 'Components/StatisticsChart',
  component: StatisticsChart,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<StatisticsChartProps> = (args) => <StatisticsChart {...args} />

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
