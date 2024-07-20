import { composeStories } from '@storybook/react'
import * as stories from '../index.stories'
const { Primary } = composeStories(stories)

const accordionButton = '.usa-accordion__button'

describe('Accordion component tests', () => {
  it('Should expand when user clicks plus icon and collapse when user clicks minus icon', () => {
    cy.mount(<Primary />)
    cy.get(accordionButton).click()
    cy.get(accordionButton).should('have.attr', 'aria-expanded', 'true')
    cy.get(accordionButton).click()
    cy.get(accordionButton).should('have.attr', 'aria-expanded', 'false')
  })
})
