/// <reference types="cypress" />

import * as utils from '../../support/utils.js'
import * as EN_LOCALE_DATA from '../../../src/shared/locales/en/en.json'
import * as EN_DOLO_MOCK_DATA from '../../../src/shared/api/mock-data/current.json'
import { pageObjects } from '../../support/pageObjects.js'

const dob = utils.getDateByOffset(-(18 * 365.2425 - 1))
const dod = utils.getDateByOffset(-30)

const relation =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
const status =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value

describe('Validate scrolling when modal is open', () => {
  it('Should disable body from scrolling when model is open', () => {
    cy.visit(utils.storybookUri)
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    utils.dataInputs({ dod })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    cy.scrollTo('bottom')
  })
})
