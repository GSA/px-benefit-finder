// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import './commands'

import * as sbPreview from '../../.storybook/preview'
import { setProjectAnnotations } from '@storybook/react'
import { mount } from 'cypress/react18'

setProjectAnnotations(sbPreview) // set decorators from storybook

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)
