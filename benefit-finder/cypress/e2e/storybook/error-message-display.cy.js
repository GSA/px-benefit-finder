/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'
import * as utils from '../../support/utils'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'
import * as EN_LOCALE_DATA from '../../../../benefit-finder/src/shared/locales/en/en.json'
import 'cypress-plugin-tab'

const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))

const dataInputs = ({ dob, relation, status }) => {
  // input date of birth
  dob &&
    cy.enterDateOfBirth(dateOfBirth.month, dateOfBirth.day, dateOfBirth.year)
  // input relation to deceaseed
  relation &&
    pageObjects
      .applicantRelationshipToDeceased()
      .select(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
      )
  // input relation to deceaseed
  status &&
    pageObjects
      .applicantMaritalStatus()
      .select(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value
      )
}

const alertHiddenState = {
  'aria-hidden': 'true', // expects a hidden error notice to have "aria-hidden=true"
  tabindex: '0', // expects a hidden error notice to have "tabindex=-0"
  role: 'alert', // expects a hidden error notice to have "role=alert"
  'aria-live': 'polite', // expects a top level visible error notice to have "aria-live="polite"
}

const alertDisplayState = {
  'aria-hidden': 'false', // expect a visible error notice to have "aria-hidden=false"
  tabindex: '0', // expect a visible error notice to have "tabindex=0"
  role: 'alert', // expects a hidden error notice to have "role=alert"
  'aria-live': 'assertive', // expect a top level visible error notice to have "aria-live="assertive""
}

beforeEach(() => {
  cy.visit(utils.storybookUri)
  pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
})

describe('Validate correct error messages display for negative scenarios', () => {
  it('Should load with error notice hidden and will have the correct aria attributes on load', () => {
    // expects the error notice to be hidden if no errors are present
    pageObjects.benefitSectionAlert().should('have.class', 'display-none')

    for (const attr in alertHiddenState) {
      pageObjects
        .benefitSectionAlert()
        .invoke('attr', attr)
        .should('eq', alertHiddenState[attr])
    }
  })

  it('Should display error message when user attempts to move forward without completing required field', () => {
    // expect when a user selects continue the focus is made on the error notice at the top
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.focused().should('have.class', 'usa-alert--error')

    // expect the error notice to be visible if errors are present
    pageObjects.benefitSectionAlert().should('not.have.class', 'display-none')

    for (const attr in alertDisplayState) {
      pageObjects
        .benefitSectionAlert()
        .invoke('attr', attr)
        .should('eq', alertDisplayState[attr])
    }
  })

  it('Should allow tabbing to the next error message', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')
  })

  it('Should hide the error message if field error is resolved', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')

    // expect when a user has resolved all errors the top level error notices is not visible or accessible
    dataInputs({ dob: true, relation: true, status: true })

    // expect the error notice to be hidden if errors are present
    pageObjects.benefitSectionAlert().should('have.class', 'display-none')
    pageObjects.dateAlert().should('not.exist')
  })

  it('Should not allow moving forward by clicking continue when error banner is present', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')

    // expect when a user has resolved all errors the top level error notices is not visible or accessible
    dataInputs({ dob: true, relation: true })

    // expect the error notice to be visible if errors are present
    pageObjects.benefitSectionAlert().should('not.have.class', 'display-none')
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.focused().should('have.class', 'usa-alert--error')
  })

  it('Should not allow moving forward by clicking step nav when error banner is present', () => {
    // expect when a user tabs from the focus error they can tab any other error notices in the form
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.focused().should('have.class', 'usa-alert--error').tab()
    cy.focused().should('have.class', 'bf-usa-date-alert')

    // expect when a user has resolved all errors the top level error notices is not visible or accessible
    dataInputs({ dob: true, relation: true })

    // expect the error notice to be visible and focused if errors are present
    pageObjects.benefitSectionAlert().should('not.have.class', 'display-none')
    pageObjects.stepIndicator().click()
    cy.focused().should('have.class', 'usa-alert--error')
  })
})
