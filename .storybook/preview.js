import '../src/assets/css/index.css';

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'darkbg',
    values: [
      {
        name: 'darkbg',
        value: '#000012',
      },
    ],
  },
}
