/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'
import * as utils from '../../support/utils'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'
import content from '../../../../benefit-finder/src/shared/api/mock-data/current.js'
import * as EN_LOCALE_DATA from '../../../../benefit-finder/src/shared/locales/en/en.json'
const { data } = JSON.parse(content)

describe('Validate correct eligibility benefits display based on selected criteria/options', () => {
  it('Should render Survivor Benefits for Child benefit accordion correctly based on selected cretiria options', () => {
    // 18 years ago minus one day - applicant under 18 years old
    // 1 day = 365.2425 (accounts for leap year)
    const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
    cy.visit('/iframe.html?args=&id=app--primary&viewMode=story')

    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
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
      .radioButtonById(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[3].fieldset.inputs[0].inputCriteria.id
      )
      .contains('Yes')
      .click()

    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()

    // Date of death - 30 days ago
    const dateOfDeath = utils.getDateByOffset(-30)
    cy.enterDateOfDeath(dateOfDeath.month, dateOfDeath.day, dateOfDeath.year)

    pageObjects
      .radioButtonById(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[1]
          .section.fieldsets[2].fieldset.inputs[0].inputCriteria.id
      )
      .contains('Yes')
      .click()

    pageObjects
      .radioButtonById(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[1]
          .section.fieldsets[3].fieldset.inputs[0].inputCriteria.id
      )
      .contains('Yes')
      .click()

    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()

    pageObjects
      .buttonGroup()
      .contains(EN_LOCALE_DATA.reviewSelectionModal.buttonGroup[1].value)
      .click()
    pageObjects
      .accordionByTitle(EN_DOLO_MOCK_DATA.data.benefits[23].benefit.title)
      .click()
      .parent()
      .parent()
      .parent()
      .find('[data-testid="bf-key-eligibility-criteria-list"] li')
      .should(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[23].benefit.eligibility[0].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[23].benefit.eligibility[1].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[23].benefit.eligibility[2].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[23].benefit.eligibility[3].label
      )
      .and(
        'contain',
        EN_DOLO_MOCK_DATA.data.benefits[23].benefit.eligibility[4].label
      )
  })

  it('qa scenario 1 Covid EN - Verify correct benefit results for query values that includes covid in search parameter of URL', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.results
    const scenario = utils.encodeURIFromObject(selectedData)
    delete selectedData.shared // We don't want to include the "shared" param
    const selectDataLength = Object.keys(selectedData).length
    const benefitsCount = data.benefits.length

    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .accordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and(
        'contain',
        EN_LOCALE_DATA.resultsView.benefitAccordion.eligibleStatusLabels[0]
      )
      .and('contain', enResults.eligible.eligible_benefits[0])
      .and('contain', enResults.eligible.eligible_benefits[1])
      .and('contain', enResults.eligible.eligible_benefits[2])

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-testid')
      .should('eq', 'bf-result-view')

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-test-results-view')
      .should('eq', 'bf-eligible-view')

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-test-results-view-criteria-values')
      .should('eq', `${selectDataLength}`)

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-test-results-view-benefits')
      .should('eq', `${benefitsCount}`)

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-test-results-view-eligible')
      .should('eq', `${enResults.eligible.length}`)

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-test-results-view-more-info')
      .should('eq', `${enResults.moreInformationNeeded.length}`)

    pageObjects
      .benefitResultsView()
      .invoke('attr', 'data-test-results-view-not-eligible')
      .should(
        'eq',
        `${benefitsCount - enResults.eligible.length - enResults.moreInformationNeeded.length}`
      )
  })

  it('QA scenario 2 Veteran EN - Verify correct benefit results for query values that includes veteran in search parameter of URL', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_2_veteran.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_2_veteran.en.results
    const scenario = utils.encodeURIFromObject(selectedData)

    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .accordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and(
        'contain',
        EN_LOCALE_DATA.resultsView.benefitAccordion.eligibleStatusLabels[0]
      )
      .and('contain', enResults.eligible.eligible_benefits[0])
  })

  it('QA scenario 3 Coal Miner EN - Verify correct benefit results for query values that includes Coal Miner in search parameter of URL', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_3_coal_miner.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_3_coal_miner.en.results
    const scenario = utils.encodeURIFromObject(selectedData)

    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .accordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and(
        'contain',
        EN_LOCALE_DATA.resultsView.benefitAccordion.eligibleStatusLabels[0]
      )
      .and('contain', enResults.eligible.eligible_benefits[0])
  })

  it('Should display green check icons on eligible benefits', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_2_veteran.en.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`${utils.storybookUri}${scenario}`)
    pageObjects.expandAll().click()
    pageObjects.iconGreenCheck().should('exist')
  })

  it('Should display Zero benefit view when no benefit are eligible', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.zero_benefit_view.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.zero_benefit_view.en.results
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`${utils.storybookUri}${scenario}`)

    pageObjects
      .zeroBenefitsViewHeading()
      .should('contain', EN_LOCALE_DATA.resultsView.zeroBenefits.heading)

    pageObjects
      .accordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)

    pageObjects
      .seeAllBenefitsButton()
      .should('contain', EN_LOCALE_DATA.resultsView.zeroBenefits.cta)
  })
})
