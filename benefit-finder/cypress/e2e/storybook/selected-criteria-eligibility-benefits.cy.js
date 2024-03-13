/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'
import * as utils from '../../support/utils'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

describe('Validate correct eligibility benefits display based on selected criteria/options', () => {
  it('Should render Survivor Benefits for Child benefit accordion correctly based on selected cretiria options', () => {
    // 18 years ago minus one day - applicant under 18 years old
    // 1 day = 365.2425 (accounts for leap year)
    const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
    cy.visit('/iframe.html?args=&id=app--primary&viewMode=story')

    pageObjects.button().contains('Start').click()
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

    pageObjects
      .benefitSectionFieldset()
      .contains(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[3].fieldset.inputs[0].inputCriteria.label
      )
      .parent()
      .find('.usa-radio__label')
      .contains('Yes')
      .click()

    pageObjects.button().contains('Continue').click()

    // Date of death - 30 days ago
    const dateOfDeath = utils.getDateByOffset(-30)
    cy.enterDateOfDeath(dateOfDeath.month, dateOfDeath.day, dateOfDeath.year)

    pageObjects
      .benefitSectionFieldset()
      .contains(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[1]
          .section.fieldsets[2].fieldset.inputs[0].inputCriteria.label
      )
      .parent()
      .find('.usa-radio__label')
      .contains('Yes')
      .click()

    pageObjects
      .benefitSectionFieldset()
      .contains(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[1]
          .section.fieldsets[3].fieldset.inputs[0].inputCriteria.label
      )
      .parent()
      .find('.usa-radio__label')
      .contains('Yes')
      .click()

    pageObjects.button().contains('Continue').click()

    pageObjects.buttonGroup().contains('See results').click()
    pageObjects.accordion('Survivors benefits for child').click()

    cy.get('.bf-key-eligibility-criteria-list li')
      .filter(':visible')
      .should(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[22].benefit.eligibility[0].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[22].benefit.eligibility[1].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[22].benefit.eligibility[2].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[22].benefit.eligibility[3].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[22].benefit.eligibility[4].label
      )
  })

  it('qa scenario 1 Covid EN - Verify correct benefit results for query values that includes covid in search parameter of URL', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.results
    const scenario = utils.encodeURIFromObject(selectedData)

    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .benefitsAccordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and('contain', 'Likely Eligible')
      .and('contain', enResults.eligible.eligible_benefits[0])
      .and('contain', enResults.eligible.eligible_benefits[1])
      .and('contain', enResults.eligible.eligible_benefits[2])
  })

  it('QA scenario 2 Veteran EN - Verify correct benefit results for query values that includes veteran in search parameter of URL', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_2_veteran.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_2_veteran.en.results
    const scenario = utils.encodeURIFromObject(selectedData)

    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .benefitsAccordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and('contain', 'Likely Eligible')
      .and('contain', enResults.eligible.eligible_benefits[0])
  })

  it('QA scenario 3 Coal Miner EN - Verify correct benefit results for query values that includes Coal Miner in search parameter of URL', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_3_coal_miner.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_3_coal_miner.en.results
    const scenario = utils.encodeURIFromObject(selectedData)

    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .benefitsAccordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and('contain', 'Likely Eligible')
      .and('contain', enResults.eligible.eligible_benefits[0])
  })
})
