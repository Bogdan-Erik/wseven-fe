import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { CookieConsent, CookieConsentProps } from './CookieConsent'
import docs from './CookieConsent.docs.mdx'

export default {
  title: 'Components/CookieConsent',
  component: CookieConsent,
  parameters: {
    docs: { page: docs },
    // layout: 'centered', // or 'fullscreen' or 'padded' (default)
    /* backgrounds: {
      default: 'white',
    },*/
  },
} as Meta

const Template: Story<CookieConsentProps> = (args) => <CookieConsent {...args} />

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
