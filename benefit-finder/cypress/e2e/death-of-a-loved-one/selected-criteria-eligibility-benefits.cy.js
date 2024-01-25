/// <reference types="cypress" />

import { pageObjects } from '../../support/pageObjects'
import * as utils from '../../support/utils'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

describe('Validate correct eligibility benefits display based on selected criteria/options', () => {
  it.only('qa scenario 1 EN - Verify correct benefit results for query values that includes covid in search parameter of URL', () => {
    const benefitsCriteria = BENEFITS_ELIBILITY_DATA.scenario_1.en.param
    const applicant_date_of_birth = encodeURI(
      `{"month":"${
        benefitsCriteria.applicant_date_of_birth_month - 1
      }","day":"${benefitsCriteria.applicant_date_of_birth_day}","year":"${
        benefitsCriteria.applicant_date_of_birth_year
      }"}`
    )
    const deceased_date_of_death = encodeURI(
      `{"month":"${benefitsCriteria.deceased_date_of_death_month - 1}","day":"${
        benefitsCriteria.deceased_date_of_death_day
      }","year":"${benefitsCriteria.deceased_date_of_death_year}"}`
    )
    cy.visit(
      `/iframe.html?args=&id=app--primary&viewMode=story&applicant_date_of_birth=${applicant_date_of_birth}&applicant_relationship_to_the_deceased=${benefitsCriteria.applicant_relationship_to_the_deceased}&applicant_marital_status=${benefitsCriteria.applicant_marital_status}&applicant_citizen_status=${benefitsCriteria.applicant_citizen_status}&applicant_care_for_child=${benefitsCriteria.applicant_care_for_child}&applicant_paid_funeral_expenses=${benefitsCriteria.applicant_paid_funeral_expenses}&deceased_date_of_death=${deceased_date_of_death}&deceased_death_location_is_US=${benefitsCriteria.deceased_death_location_is_US}&deceased_paid_into_SS=${benefitsCriteria.deceased_paid_into_SS}&deceased_public_safety_officer=${benefitsCriteria.deceased_public_safety_officer}&deceased_miner=${benefitsCriteria.deceased_miner}&deceased_american_indian=${benefitsCriteria.deceased_american_indian}&deceased_died_of_COVID=${benefitsCriteria.deceased_died_of_COVID}&deceased_served_in_active_military=${benefitsCriteria.deceased_served_in_active_military}&shared=true`
    )
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_1.en.results
    pageObjects
      .benefitsAccordion()
      .filter(':visible')
      .should('have.length', enResults.eligible.length)
      .and('contain', 'Likely Eligible')
      .and('contain', enResults.eligible.eligible_benefits[0])
      .and('contain', enResults.eligible.eligible_benefits[1])
      .and('contain', enResults.eligible.eligible_benefits[2])
      .and('contain', enResults.eligible.eligible_benefits[3])
      .and('contain', enResults.eligible.eligible_benefits[4])
  })

  it('qa scenario 1 ES - Verify correct benefit results for query values that includes covid in search parameter of URL', () => {
    const benefitsCriteria = BENEFITS_ELIBILITY_DATA.scenario_1.es.param
    const applicant_date_of_birth = encodeURI(
      `{"month":"${
        benefitsCriteria.applicant_date_of_birth_month - 1
      }","day":"${benefitsCriteria.applicant_date_of_birth_day}","year":"${
        benefitsCriteria.applicant_date_of_birth_year
      }"}`
    )
    const deceased_date_of_death = encodeURI(
      `{"month":"${benefitsCriteria.deceased_date_of_death_month - 1}","day":"${
        benefitsCriteria.deceased_date_of_death_day
      }","year":"${benefitsCriteria.deceased_date_of_death_year}"}`
    )
    cy.visit(
      `/es/death?args=&id=app--primary&viewMode=story&es_applicant_date_of_birth=${applicant_date_of_birth}&es_applicant_relationship_to_the_deceased=${benefitsCriteria.applicant_relationship_to_the_deceased}&es_applicant_marital_status=${benefitsCriteria.applicant_marital_status}&es_applicant_citizen_status=${benefitsCriteria.applicant_citizen_status}&es_applicant_care_for_child=${benefitsCriteria.applicant_care_for_child}&es_applicant_paid_funeral_expenses=${benefitsCriteria.applicant_paid_funeral_expenses}&es_deceased_date_of_death=${deceased_date_of_death}&es_deceased_death_location_is_US=${benefitsCriteria.deceased_death_location_is_US}&es_deceased_paid_into_SS=${benefitsCriteria.deceased_paid_into_SS}&es_deceased_public_safety_officer=${benefitsCriteria.deceased_public_safety_officer}&es_deceased_miner=${benefitsCriteria.deceased_miner}&es_deceased_american_indian=${benefitsCriteria.deceased_american_indian}&es_deceased_died_of_COVID=${benefitsCriteria.deceased_died_of_COVID}&es_deceased_served_in_active_military=${benefitsCriteria.deceased_served_in_active_military}&shared=true`
    )
    const esResults = BENEFITS_ELIBILITY_DATA.scenario_1.es.results
    pageObjects
      .benefitsAccordion()
      .filter(':visible')
      .should('have.length', esResults.eligible.length)
      .and('contain', 'Probablemente elegible')
      .and('contain', esResults.eligible.eligible_benefits[0])
      .and('contain', esResults.eligible.eligible_benefits[1])
      .and('contain', esResults.eligible.eligible_benefits[2])
      .and('contain', esResults.eligible.eligible_benefits[3])
      .and('contain', esResults.eligible.eligible_benefits[4])
  })
  it('Should render Survivor Benefits for Child benefit accordion correctly based on selected cretiria options', () => {
    // 18 years ago minus one day - applicant under 18 years old
    // 1 day = 365.2425 (accounts for leap year)
    const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
    cy.visit('/iframe.html?args=&id=app--primary&viewMode=story', {
      auth: {
        username: Cypress.env('authUsername'),
        password: Cypress.env('authPassword'),
      },
    })

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

    cy.get('.key-eligibility-criteria-list li')
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
})
