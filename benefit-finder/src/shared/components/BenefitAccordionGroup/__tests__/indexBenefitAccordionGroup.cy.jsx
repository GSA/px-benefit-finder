import { composeStories } from '@storybook/react'
import * as stories from '../index.stories'
const { Primary, ExpandAll } = composeStories(stories)

describe('BenefitAccordionGroup component tests', () => {
  it('Validate opening individual accordion only expands the clicked accordion and clicking it again closes it', () => {
    cy.mount(<Primary />)
    cy.get('.usa-accordion__button').contains('Burial benefits').click()
    cy.get('.usa-accordion__button')
      .contains('Burial benefits')
      .parent()
      .should('have.attr', 'aria-expanded', 'true')
    cy.get('.usa-accordion__button')
      .contains('Death gratuity')
      .parent()
      .should('have.attr', 'aria-expanded', 'false')
    cy.get('.usa-accordion__button').contains('Burial benefits').click()
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
    })
  })

  it('Validate clicking Expand all opens all accordions', () => {
    cy.mount(<ExpandAll />)
    cy.get('.expand-all').click()
    cy.get('.expand-all').should('contain.text', 'Collapse all')
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'true')
    })
  })

  it('Validate clicking Collapse all closes all accordions', () => {
    cy.mount(<ExpandAll />)
    cy.get('.expand-all').click()
    cy.get('.expand-all').click()
    cy.get('.expand-all').should('contain.text', 'Expand all')
    cy.get('.usa-accordion__button').each(accordion => {
      cy.wrap(accordion).should('have.attr', 'aria-expanded', 'false')
    })
  })
})
