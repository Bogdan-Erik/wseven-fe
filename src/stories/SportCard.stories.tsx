import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SportCard } from './SportCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'WSeven/SportCard',
  component: SportCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
    }
  },
} as ComponentMeta<typeof SportCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SportCard> = (args) => <SportCard {...args} />;

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
