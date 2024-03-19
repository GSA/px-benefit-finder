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

Cypress.Commands.add('enterDateOfBirth', (month, day, year) => {
  pageObjects.applicantDateOfBirthMonth().select(month)
  pageObjects.applicantDateOfBirthDay().type(day)
  pageObjects.applicantDateOfBirthYear().type(year)
})

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

Cypress.Commands.add(
  'shouldNotBeActionable',
  { prevSubject: 'element' },
  (subject, { p }, done) => {
    console.log(p)
    cy.once('fail', err => {
      expect(err.message).to.include(
        '`cy.scrollTo()` failed because this element is not scrollable'
      )
      // expect(err.message).to.include('is being covered by another element')
      done()
    })

    cy.wrap(subject)
      .scrollTo(p)
      .then(() =>
        done(
          new Error(
            'Expected element NOT to be clickable, but click() succeeded'
          )
        )
      )
  }
)
