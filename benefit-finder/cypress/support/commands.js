// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { pageObjects } from './pageObjects'

Cypress.Commands.add(
  'enterDateOfBirth',
  (id = 'applicant_date_of_birth', month, day, year) => {
    pageObjects
      .applicantDateOfBirth()
      .find('[data-testid="month"]')
      .select(month)

    pageObjects.applicantDateOfBirth().find('[data-testid="day"]').select(day)

    pageObjects.applicantDateOfBirth().find('[data-testid="year"]').select(year)
  }
)

Cypress.Commands.add('enterDateOfDeath', (month, day, year) => {
  pageObjects.applicantDateOfDeathMonth().select(month)
  pageObjects.applicantDateOfDeathDay().type(day)
  pageObjects.applicantDateOfDeathYear().type(year)
})

Cypress.Commands.add('enterDateOfFuneral', (month, day, year) => {
  pageObjects.applicantDateOfFuneralMonth().select(month)
  pageObjects.applicantDateOfFuneralDay().type(day)
  pageObjects.applicantDateOfFuneralYear().type(year)
})
