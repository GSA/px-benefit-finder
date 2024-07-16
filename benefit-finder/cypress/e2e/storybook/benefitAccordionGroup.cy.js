import * as utils from '../../support/utils'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

beforeEach(() => {
  const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
  const scenario = utils.encodeURIFromObject(selectedData)
  cy.visit(`${utils.storybookUri}${scenario}`)
})

describe('BenefitAccordionGroup component tests', () => {
  // it.only('Validate all accordions are closed on load', () => {
  //   cy.get('.bf-usa-accordion:visible').each(accordion => {
  //     cy.wrap(accordion)
  //       .find('.bf-usa-accordion__button')
  //       .should('have.attr', 'aria-expanded', 'false')
  //   })
  // })

  it('Validate opening individual accordion expands the clicked accordion and clicking it again closes it', () => {
    cy.wait(2500)
    // get the first visible accordion and check if it is expanded
    cy.get('.bf-usa-accordion:visible .bf-usa-accordion__button')
      .eq(0)
      .should('have.attr', 'aria-expanded', 'false')
    // get the first visible accordion and click it
    cy.get('.bf-usa-accordion:visible .bf-usa-accordion__button').eq(0).click()
    // get the first visible accordion and check if it is expanded
    cy.get('.bf-usa-accordion:visible .bf-usa-accordion__button')
      .eq(0)
      .should('have.attr', 'aria-expanded', 'true')
    // get the second visible accordion and check if it is expanded
    cy.get('.bf-usa-accordion:visible .bf-usa-accordion__button')
      .eq(1)
      .should('have.attr', 'aria-expanded', 'false')
    // get the first visible accordion and click it
    cy.get('.bf-usa-accordion:visible .bf-usa-accordion__button').eq(0).click()
    // get the first visible accordion and check if it is expanded
    cy.get('.bf-usa-accordion:visible .bf-usa-accordion__button')
      .eq(0)
      .should('have.attr', 'aria-expanded', 'false')
  })

  // it('Validate clicking Expand all opens all accordions', () => {
  //   cy.get('.bf-expand-all').click()
  //   cy.get('.bf-expand-all').should('contain.text', 'Close all')
  //   cy.get('.bf-usa-accordion:visible').each(accordion => {
  //     cy.wrap(accordion)
  //       .find('.bf-usa-accordion__button')
  //       .should('have.attr', 'aria-expanded', 'true')
  //   })
  // })

  // it('Validate clicking Collapse all closes all accordions', () => {
  //   cy.get('.bf-expand-all').click()
  //   cy.get('.bf-expand-all').click()
  //   cy.get('.bf-expand-all').should('contain.text', 'Open all')
  //   cy.get('.bf-usa-accordion:visible').each(accordion => {
  //     cy.wrap(accordion)
  //       .find('.bf-usa-accordion__button')
  //       .should('have.attr', 'aria-expanded', 'false')
  //   })
  // })
})

// breif update

// outside of work
// new art project using midjouney and programiatic AI image generation and apply them to a mechanical drawing process

// benefit finder
// prepareing for a release
// collecting technical requirements for new feature requests
// troubleshooting some cypress failures that are only occuring in the pipeline, "works on my local"!

// what I want to learn

// What I am leaning now

// got my kicks on front end development
// but, more full stack experience, back end languages, postgress (db) super powers
// currently going deep in python, formal training

// What I want to learn
// more depth in traditional computer science knowledge, especially on how it relates to advanced visiualization techniques, in data visualization or virtual and augmented environments

// unlimitied time and resource

// more space exploriing
