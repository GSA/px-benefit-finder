# WIP | BEARS Application

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Get our packages.

```shell
npm run install
```

Build and serve development environment.

```shell
npm run start
```
## Git Hooks

We use husky to manage git hooks.

husky is automatically installed after the packages are installed.

The `pre-commit` git hook leverages `lint-staged` to run a series of scripts on any staged files when a commit is made.

the `pre-push` git hook runs a series of scripts on the directory before pushing to the origin.


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
const [value, setValue] = useState(true);
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
****
#### **6. Components**

We build each of our components with `spec`, `scss`, and `jsx` files

```
|-ComponentName
  |-ComponentName.jsx
  |-_component-name.scss
  |-ComponentName.spec.js
```

To generate a component with these files based on a name space,
you can use [plop](https://github.com/plopjs/plop)

`cd` to the root of the application

```sh
npm run generate:component
```
