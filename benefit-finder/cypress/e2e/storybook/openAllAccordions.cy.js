import * as utils from '../../support/utils'
import { pageObjects } from '../../support/pageObjects'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

beforeEach(() => {
  const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
  const scenario = utils.encodeURIFromObject(selectedData)
  cy.visit(`${utils.storybookUri}${scenario}`)
})

describe('open all interaction tests', () => {
  it('Validate clicking open all expands the accordions', () => {
    pageObjects
      .expandAll()
      .click()
      .then(() => {
        cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
          accordion => {
            cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
          }
        )
      })
  })

  it('Validate clicking close all closes all the accordions', () => {
    pageObjects
      .expandAll()
      .click()
      .then(() => {
        pageObjects
          .expandAll()
          .click()
          .then(() => {
            cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
              accordion => {
                cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
              }
            )
          })
      })
  })

  it('Validate clicking open all expands the accordions, then toggling eligible view, sets them back to close', () => {
    pageObjects
      .expandAll()
      .click()
      .then(() => {
        cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
          accordion => {
            cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
          }
        )

        pageObjects
          .notEligibleResultsButton()
          .click()
          .then(() => {
            cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
              accordion => {
                cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
              }
            )
          })
      })
  })

  it('from the not eligible view, validate clicking open all expands the accordions, then toggling eligible view, sets them back to close', () => {
    pageObjects
      .notEligibleResultsButton()
      .click()
      .then(() => {
        cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
          accordion => {
            cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
          }
        )

        pageObjects
          .expandAll()
          .click()
          .then(() => {
            cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
              accordion => {
                cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
              }
            )

            pageObjects
              .stepBackLink()
              .click()
              .then(() => {
                cy.get('.bf-usa-accordion__button.usa-accordion__button').each(
                  accordion => {
                    cy.wrap(accordion).should(
                      'have.attr',
                      'aria-expanded',
                      'false'
                    )
                  }
                )
              })
          })
      })
  })

  // it('Validate clicking Expand all opens all accordions', () => {
  //   cy.get('.bf-expand-all').click()
  //   cy.get('.bf-expand-all').should('contain.text', 'Close all')
  //   cy.get('.usa-accordion__button').each(accordion => {
  //     cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
  //   })
  // })

  // it('Validate clicking Collapse all closes all accordions', () => {
  //   cy.get('.bf-expand-all').click()
  //   cy.get('.bf-expand-all').click()
  //   cy.get('.bf-expand-all').should('contain.text', 'Open all')
  //   cy.get('.usa-accordion__button').each(accordion => {
  //     cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
  //   })
  // })
})
