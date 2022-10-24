module.exports = {
  "stories": [
    "../src/**/**/*.docs.mdx",
    "../src/**/**/*.stories.tsx",
    "../src/**/*.docs.@(js|jsx|ts|tsx)"
  ],
  
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
  }
}