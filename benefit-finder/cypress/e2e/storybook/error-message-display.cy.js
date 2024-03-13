/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'
import * as utils from '../../support/utils'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'
import 'cypress-plugin-tab'

beforeEach(() => {
  cy.visit('/iframe.html?args=&id=app--primary&viewMode=story')
  pageObjects.button().contains('Start').click()
})

describe('Validate correct error messages display for negative scenarios', () => {
  it('Should load with error notice hidden and will have the correct aria attributes on load', () => {
    // expects the error notice to be hidden if no errors are present
    pageObjects.benefitSectionAlert().should('have.class', 'display-none')

    // expects a hidden error notice to have "aria-hidden=true"
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'aria-hidden')
      .should('eq', 'true')

    // expects a hidden error notice to have "tabindex=-1"
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'tabindex')
      .should('eq', '0')

    // expects a hidden error notice to have "role=alert"
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'role')
      .should('eq', 'alert')

    // expects a top level visible error notice to have "aria-live="polite"
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'aria-live')
      .should('eq', 'polite')
  })

  it('Should display error message when user attempts to move forward without completing required field', () => {
    // expect when a user selects continue the focus is made on the error notice at the top
    pageObjects.button().contains('Continue').click()
    cy.focused().should('have.class', 'usa-alert--error')

    // expect the error notice to be visible if errors are present
    pageObjects.benefitSectionAlert().should('not.have.class', 'display-none')

    // expect a visible error notice to have "aria-hidden=false"
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'aria-hidden')
      .should('eq', 'false')

    // expect a visible error notice to have "tabindex=0"
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'tabindex')
      .should('eq', '0')

    // expect a top level visible error notice to have "aria-live="assertive""
    pageObjects
      .benefitSectionAlert()
      .invoke('attr', 'aria-live')
      .should('eq', 'assertive')
  })

  it('Should allow tabbing to the next error message', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains('Continue').click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')
  })

  it('Should hide the error message if field error is resolved', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains('Continue').click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')
    // expect when a user has resolved all errors the top level error notices is not visible or accessible
    const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
    cy.enterDateOfBirth(dateOfBirth.month, dateOfBirth.day, dateOfBirth.year)
    pageObjects
      .applicantRelationshipToDeceased()
      .select(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
      )
    pageObjects
      .applicantMaritalStatus()
      .select(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value
      )

    // expect the error notice to be hidden if errors are present
    pageObjects.benefitSectionAlert().should('have.class', 'display-none')
    pageObjects.dateAlert().should('not.exist')
  })

  it('Should not allow moving forward by clicking continue when error banner is present', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains('Continue').click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')
    // expect when a user has resolved all errors the top level error notices is not visible or accessible
    const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
    cy.enterDateOfBirth(dateOfBirth.month, dateOfBirth.day, dateOfBirth.year)
    pageObjects
      .applicantRelationshipToDeceased()
      .select(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
      )

    // expect the error notice to be visible if errors are present
    pageObjects.benefitSectionAlert().should('not.have.class', 'display-none')
    pageObjects.button().contains('Continue').click()
    cy.focused().should('have.class', 'usa-alert--error')
  })

  it('Should not allow moving forward by clicking step nav when error banner is present', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains('Continue').click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')
    // expect when a user has resolved all errors the top level error notices is not visible or accessible
    const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
    cy.enterDateOfBirth(dateOfBirth.month, dateOfBirth.day, dateOfBirth.year)
    pageObjects
      .applicantRelationshipToDeceased()
      .select(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
      )

    // expect the error notice to be visible and focused if errors are present
    pageObjects.benefitSectionAlert().should('not.have.class', 'display-none')
    pageObjects.stepIndicator().click()
    cy.focused().should('have.class', 'usa-alert--error')
  })
})
