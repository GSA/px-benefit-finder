/// <reference types="cypress" />

import * as utils from '../../support/utils.js'
import * as EN_LOCALE_DATA from '../../../src/shared/locales/en/en.json'
import * as EN_DOLO_MOCK_DATA from '../../../src/shared/api/mock-data/current.json'
import { pageObjects } from '../../support/pageObjects.js'

const dob = utils.getDateByOffset(-(18 * 365.2425 - 1))
const relation =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
const relationshipId =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[1].fieldset.inputs[0].inputCriteria.id
const status =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value

describe('Validate state of aria-invalid attribute', () => {
  beforeEach(() => {
    cy.visit(utils.storybookUri)
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
  })

  it('Should have default state of "false" for select, input, and radio', () => {
    pageObjects
      .fieldsetById(relationshipId)
      .invoke('attr', 'aria-invalid')
      .should('eq', 'false')

    pageObjects
      .benefitMemorableDateById('day')
      .invoke('attr', 'aria-invalid')
      .should('eq', 'false')

    pageObjects
      .radioGroup()
      .invoke('attr', 'aria-invalid')
      .should('eq', 'false')
  })

  it('Should have state of "true" when a required field has no value', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()

    pageObjects
      .fieldsetById(relationshipId)
      .invoke('attr', 'aria-invalid')
      .should('eq', 'true')

    pageObjects
      .benefitMemorableDateById('day')
      .invoke('attr', 'aria-invalid')
      .should('eq', 'true')
  })

  it('Should have state of "false" when previous was true but error has been resolved', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()

    pageObjects
      .fieldsetById(relationshipId)
      .invoke('attr', 'aria-invalid')
      .should('eq', 'true')
    pageObjects
      .benefitMemorableDateById('day')
      .invoke('attr', 'aria-invalid')
      .should('eq', 'true')

    utils.dataInputs({ dob, relation, status })

    pageObjects
      .fieldsetById(relationshipId)
      .invoke('attr', 'aria-invalid')
      .should('eq', 'false')

    pageObjects
      .benefitMemorableDateById('day')
      .invoke('attr', 'aria-invalid')
      .should('eq', 'false')
  })
})
