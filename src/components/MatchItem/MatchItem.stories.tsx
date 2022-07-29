import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { MatchItem, MatchItemProps } from './MatchItem'
import docs from './MatchItem.docs.mdx'

export default {
  title: 'Components/MatchItem',
  component: MatchItem,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<MatchItemProps> = (args) => <MatchItem {...args} />


export const Winner = Template.bind({});
Winner.args = {
  date: '2022. június 01.',
  time: '20:30',
  home: 'Real Madrid',
  away: 'Barcelona',
  winner: 'home',
  isDailyTipp: false,
  odds: '1.68',
  tippString: 'Tipp: Real Madrid győzelem',
  isWinner: true,
  winningPrice: '+10 egység',
};

export const Lost = Template.bind({});
Lost.args = {
  date: '2022. szeptember 01.',
  time: '19:30',
  home: 'Bayer München',
  away: 'Borussia Dortmund',
  winner: 'home',
  isDailyTipp: true,
  odds: '1.43',
  tippString: 'Tipp: Borussia Dortmund győzelem',
  isWinner: false,
  winningPrice: '-10 egység',
};