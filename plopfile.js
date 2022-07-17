module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: './generate/component/templates/index.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.css',
        templateFile: './generate/component/templates/Component.module.css.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        // Handlebars template used to generate content of new file
        templateFile: './generate/component/templates/Component.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.docs.mdx',
        templateFile: './generate/component/templates/docs.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: './generate/component/templates/story.hbs',
      },
      {
        type: 'modify',
        path: './src/components/index.ts',
        pattern: /(\/\* -- component: insert above here -- \*\/)/gi,
        template: `export { {{pascalCase name}} } from './{{pascalCase name}}'\n$1`,
      },
    ],
  });
};