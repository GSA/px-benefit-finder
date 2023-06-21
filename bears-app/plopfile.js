module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/components/shared/{{pascalCase name}}/index.jsx',
        templateFile:
          'src/components/shared/.ComponentTemplate/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/shared/{{pascalCase name}}/__tests__/index.spec.js',
        templateFile:
          'src/components/shared/.ComponentTemplate/Component.spec.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/shared/{{pascalCase name}}/_index.scss',
        templateFile:
          'src/components/shared/.ComponentTemplate/_Component.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/shared/{{pascalCase name}}/index.stories.jsx',
        templateFile:
          'src/components/shared/.ComponentTemplate/Component.stories.jsx.hbs',
      },
    ],
  })
}
