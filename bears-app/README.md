# WIP | BEARS v2 React Application

```text
/bears-app
  |-.husky
    |-git-hooks
  |-.storybook
  |-public
    |-index.html
  |-src
    |-App
    |-shared
      |-api
      |-components
        |-ComponentName
          |-__tests__
            |-__snapshots__
            |-index.spec.js
          |-index.jsx
          |-index.stories.jsx
          |-_index.scss
        |-style-docs
      |-hooks
  |-index.jsx
  |-README.md
```

<br>

### Basics:

- "Modules", like `App` should follow the structure of routes.
- Files from one module can only import from ancestor folders within the same module or from `src/components/shared`.

<br>

| File or folder          | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| `src/index.jsx`         | Entry file.                                                |
| `public/index.html`     | All scripts and styles injected here                       |
| `src/App`               | Main application routes, global / ancestor of all modules. |
| `src/shared/api`        | dev utils for interacting with data                        |
| `src/shared/components` | Components, constants, machines, hooks, styles, utils etc; |
| `src/shared/hooks`      | Custom Hooks                                               |
| `src/shared/style-docs` | mdx files for !stories documentation                       |
|                         | **_Any module is allowed to import from shared._**         |

<br>

### File Types:

| file type       | Description                                              |
| --------------- | -------------------------------------------------------- |
| `.jsx`          | React functional components                              |
| `.js`           | ES                                                       |
| `.stories.jsx`  | Component Story Format files for storybook stories       |
| `.mdx`          | Markdown files that accept ES imports for storybook docs |
| `.md`           | Markdown files for project docs                          |
| `.spec.js`      | Testing specification                                    |
| `.spec.js.snap` | Testing snapshots                                        |
| `.hbs`          | Handlebars (used in plop generated components)           |
| `.scss`         | Syntactically awesome style sheets                       |
| `.json`         | JavaScript Object Notation                               |
| `*rc`           | Resource files                                           |
| `*sh`           | Bash files                                               |

<br>

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Get our packages.

```shell
npm install
```

### Build and serve development environment.

There are two build environments, one for our component workshop (Storybook) and another for our Application (CRACO)

#### CRACO APP

Rather than ejecting the react scripts, we override them with tooling. (Learn more about [Craco](https://craco.js.org/docs/getting-started/).

```shell
npm run dev
```

#### Storybook

Run development workshop.

```shell
npm run dev:storybook
```

## Git Hooks

We use husky to manage git hooks.

husky is automatically installed after the packages are installed.

- The `pre-commit` git hook leverages `lint-staged` to run a series of scripts on any staged files when a commit is made.

- The `pre-push` git hook runs a series of scripts on the directory before pushing to the origin.

## Coding Standards

We use a combination of linting and best practices to guide code consistency.

<br>

### Our linters include

[![js-standard-style](https://img.shields.io/badge/code%20style%20JS-standard-brightgreen.svg)](http://standardjs.com)
[![react/recommended](https://img.shields.io/badge/code%20style%20React-recommended-brightgreen.svg)](https://github.com/yannickcr/eslint-plugin-react)
[![prettier/recommended](https://img.shields.io/badge/code%20format/prettier-%20recomended-brightgreen.svg)](https://github.com/prettier/eslint-plugin-prettier)
[![stylelint](https://img.shields.io/badge/code%20format/stylelint-%20standard-brightgreen.svg)](https://github.com/cypress-io/eslint-plugin-cypress)

<br>

#### Linting and Formatting Scripts

We include a few scripts in `package.json` that can be executed to interact with our standards.

Run eslint on `.js` and `.jsx` files

```shell
npm run lint:js
```

Auto-fix lint errors

```shell
npm run lint:js:fix
```

Format `.js` and `.jsx` files with prettier.

```shell
npm run format
```

Run stylelint on `.scss` files

```shell
npm run lint:scss
```

Auto-fix lint errors

```shell
npm run lint:scss:fix
```

<br>

### **Standards outside linting**

We also carry the following working agreements that may fall outside of the linting.

---

<br>

#### **1. Avoid functionality in JSX**

If you have this...

```jsx
<Foo onClick={​​​​​​​​function () {​​​​​​​​ alert("1337") }​​​​​​​​}​​​​​​​​ />
```

We prefer this

```jsx
<Foo onClick={​​​​​​​​handleAlert}​​​​​​​​ />
```

<br>

#### **2. Avoid inline styles**

If you have this...

```jsx
<Foo style={{ width: 100% }} />
```

We prefer this

```jsx
<Foo class="full-width" />
```

<br>

#### **3. PropTypes**

Typecheck with [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

<br>

#### **4. Styles**

We take a utility first approach. We do not have full control over our styles since a custom version of USWDS already exist in the usa.gov project.

To avoid conflict we will use utility-classes and overrides with sass files as needed.

We use [Sass](https://sass-lang.com/) and [Sass Modules](https://css-tricks.com/introducing-sass-modules/)

Generally, it is recommend that you don’t reuse the same CSS classes across different components. For example, instead of using a `.usa-button` CSS class in `<AcceptButton>` and `<RejectButton>` components, it is recommended to create a `<Button>` component with its own `.usa-button` styles, that both `<AcceptButton>` and `<RejectButton>` can render (but not inherit).

We use composition, but leverage the https://designsystem.digital.gov/. We will attempt to use pre-processor methods when it makes sense to do so.

<br>

#### **5. Code Documentation**

We use inline documentation for functions, hooks, and functional components.

Example with function

```js
/**
 * a boolean function that returns a component when true.
 * @function
 * @param {boolean} value - the inherited value, can be true || false
 * @return {component} returns a component if true
 */
const handleTruth = value => value === true && <Truth />
```

Example with hook

```js
/**
 * a boolean that manages the state of truth.
 * @function
 * @param {boolean} value - the inherited value, can be true || false
 * @return {state} returns an updated state for value
 */
const [value, setValue] = useState(true)
```

Example with functional component

```js
/**
 * a functional component that wraps form elements in a form element
 * @component
 * @param {node} children - inherited children
 * @return {html} returns a semantic html div element, with all its children
 */
function Value = ({ children }) => (<div className="wrapper">{children}</div>)
```

<br>

#### **5. Testing**

We use [Jest](https://jestjs.io/) for Unit/DOM testing

```sh
npm run test
```

<br>

#### **6. Components**

We build each of our components with `spec`, `scss`, `storeies` and `jsx` files

```
|-ComponentName
  |-__tests__
    |-__snapshots__
    |-index.spec.js
  |-index.jsx
  |-index.stories.jsx
  |-_index.scss
```

To generate a component with these files based on a name space,
you can use [plop](https://github.com/plopjs/plop)

`cd` to the root of the application

```sh
npm run generate:component <component-name>
```

> It's important to export components from the root of the shared index file. This is where you will import and destructure across other documents.
