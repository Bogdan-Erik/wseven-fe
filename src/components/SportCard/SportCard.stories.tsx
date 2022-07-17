import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SportCard, SportCardProps } from './SportCard'
import docs from './SportCard.docs.mdx'

export default {
  title: 'Components/SportCard',
  component: SportCard,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
  argTypes: {
    hazai: {
      name: 'Hazai csapat/játékos',
      description: 'Hazai csapat/játékos',
      control: {
        type: 'text'
      },
      table: {
        type: {
          summary: 'The label contents',
          detail: 'Text displayed by the Badge'
        }
      }
    },
    vendeg: {
      name: 'Vendég csapat/játékos',
      description: 'Vendég csapat/játékos',
      control: {
        type: 'text'
      },
      table: {
        type: {
          summary: 'The label contents',
          detail: 'Text displayed by the Badge'
        }
      }
    },
    daily: {
      name: 'A nap tippje?',
      description: 'A napp tippje?',
      control: {
        type: 'boolean'
      },
      table: {
        type: {
          summary: 'The label contents',
          detail: 'Text displayed by the Badge'
        }
      }
    }
  },
} as Meta

const Template: Story<SportCardProps> = (args) => <SportCard {...args} />

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  size: 'small'
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  size: 'small'
};

export const LargePrimary = Template.bind({});
LargePrimary.args = {
  primary: true,
  size: 'large'
};

export const LargeSeconday = Template.bind({});
LargeSeconday.args = {
  primary: false,
  size: 'large'
};
