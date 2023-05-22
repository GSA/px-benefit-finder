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
        path: 'src/components/{{pascalCase name}}/index.jsx',
        templateFile: 'src/components/ComponentTemplate/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.spec.js',
        templateFile: 'src/components/ComponentTemplate/Component.spec.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/_{{name}}.scss',
        templateFile: 'src/components/ComponentTemplate/_Component.scss.hbs',
      },
    ],
  })
}
