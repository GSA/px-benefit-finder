import { composeStories } from '@storybook/react'
import * as stories from '../index.stories'
const { Primary, ExpandAll, SourceIsEnglish } = composeStories(stories)

describe('BenefitAccordionGroup component tests', () => {
  it('Validate opening individual accordion only expands the clicked accordion and clicking it again closes it', () => {
    cy.mount(<Primary />)
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
    cy.mount(<ExpandAll />)
    cy.get('.bf-expand-all').click()
    cy.get('.bf-expand-all').should('contain.text', 'Close all')
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
    })
  })

  it('Validate clicking Collapse all closes all accordions', () => {
    cy.mount(<ExpandAll />)
    cy.get('.bf-expand-all').click()
    cy.get('.bf-expand-all').click()
    cy.get('.bf-expand-all').should('contain.text', 'Open all')
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
    })
  })

  it('Validate SourceIsEnglish results in the display of (en inglés)', () => {
    const content = '(en inglés)'
    cy.mount(<SourceIsEnglish />)
    cy.get('.bf-expand-all').click()
    cy.get('.bf-usa-link').then(links => {
      cy.wrap(links[0]).should('contain', content)
      cy.wrap(links[1]).should('not.contain', content)
    })
  })
})
