/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'

describe('Validate correct error messages display for negative scenarios', () => {
  it('Should display error message when user does not enter date of birth required field', () => {
    cy.visit('/iframe.html?args=&id=app--primary&viewMode=story')
    pageObjects.button().contains('Start').click()
    pageObjects.button().contains('Continue').click()
    pageObjects.benefitSectionAlert().should('contain.text', 'Error status')
    pageObjects.dateAlert().should('contain.text', 'Error status')
  })
})
