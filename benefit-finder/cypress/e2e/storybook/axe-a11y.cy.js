/// <reference types="cypress" />

import * as utils from '../../support/utils.js'
import * as EN_LOCALE_DATA from '../../../../benefit-finder/src/shared/locales/en/en.json'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'
import { pageObjects } from '../../support/pageObjects'

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  )

  cy.task('table', violationData)
}

const dob = utils.getDateByOffset(-(18 * 365.2425 - 1))
const dod = utils.getDateByOffset(-(18 * 365.2425 - 1))
const relation =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
const status =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value

describe(`Validate code passes axe scanning`, () => {
  const runA11y = (skipFailOnError = null) => {
    cy.checkA11y(
      null,
      {
        retries: 3,
        interval: 100,
      },
      terminalLog,
      skipFailOnError
    )
  }

  beforeEach(() => {
    cy.visit(utils.storybookUri)
    cy.injectAxe()
  })

  it('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button) // wait for button to load
    runA11y()
  })

  // go to first step
  it('Has no detectable a11y violations on step 1', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    runA11y()
  })

  // create an error
  it('Has no detectable a11y violations on error state', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    runA11y({ skipFailOnError: true }) // remove skip after https://github.com/GSA/px-benefit-finder/issues/1072 is resolved
  })

  it('Has no detectable a11y violations on error state resolved', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    runA11y()
  })

  it('Has no detectable a11y violations on step 2', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    runA11y()
  })

  it('Has no detectable a11y violations on modal launch', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    utils.dataInputs({ dod })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    runA11y()
  })

  it('Has no detectable a11y violations on modal close review selections', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    utils.dataInputs({ dod })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    pageObjects
      .button()
      .contains(EN_LOCALE_DATA.reviewSelectionModal.buttonGroup[0].value)
      .click()
    runA11y()
  })

  it('Has no detectable a11y violations on see benefits', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    utils.dataInputs({ dod })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    pageObjects
      .button()
      .contains(EN_LOCALE_DATA.reviewSelectionModal.buttonGroup[1].value)
      .click()
    runA11y()
  })

  it('Has no detectable a11y violations on see benefits you did not qualify for', () => {
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    utils.dataInputs({ dod })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    pageObjects
      .button()
      .contains(EN_LOCALE_DATA.reviewSelectionModal.buttonGroup[1].value)
      .click()
    pageObjects
      .button()
      .contains(EN_LOCALE_DATA.resultsView.notEligibleResults.cta)
      .click()
    runA11y({ skipFailOnError: true }) // remove skip after https://github.com/GSA/px-benefit-finder/issues/1073 is resolved
  })
})
