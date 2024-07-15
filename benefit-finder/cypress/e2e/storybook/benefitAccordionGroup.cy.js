import * as utils from '../../support/utils'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

beforeEach(() => {
  const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
  const scenario = utils.encodeURIFromObject(selectedData)
  cy.visit(`${utils.storybookUri}${scenario}`)
})

describe('BenefitAccordionGroup component tests', () => {
  it('Validate opening individual accordion only expands the clicked accordion and clicking it again closes it', () => {
    cy.get('.bf-usa-accordion__button.usa-accordion__button').eq(0).click()
    cy.get('.bf-usa-accordion__button.usa-accordion__button')
      .eq(0)
      .should('have.attr', 'aria-expanded', 'true')
    cy.get('.bf-usa-accordion__button.usa-accordion__button')
      .eq(1)
      .should('have.attr', 'aria-expanded', 'false')
    cy.get('.bf-usa-accordion__button.usa-accordion__button').eq(0).click()
    cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
      accordion => {
        cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
      }
    )
  })

  it('Validate clicking Expand all opens all accordions', () => {
    cy.get('.bf-expand-all').click()
    cy.get('.bf-expand-all').should('contain.text', 'Close all')
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
    })
  })

  it('Validate clicking Collapse all closes all accordions', () => {
    cy.get('.bf-expand-all').click()
    cy.get('.bf-expand-all').click()
    cy.get('.bf-expand-all').should('contain.text', 'Open all')
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
    })
  })
})
