/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'

describe('Validate benefit-finder card on benefits page', () => {
  Cypress.on('uncaught:exception', (_err, runnable) => {
    return false
  })
  it('Should navigate to Benefit finder when clicking on Benefit finder card', () => {
    cy.visit('/benefits')
    pageObjects.cardGroup().contains('Benefit finder').click()
    pageObjects
      .breadCrumbList()
      .should('contain', 'Home')
      .and('contain', 'Government benefits')
      .and('contain', 'Benefit finder')
  })
})
