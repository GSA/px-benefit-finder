import { composeStories } from '@storybook/react'
import * as stories from '../index.stories'
const { SourceIsEnglish } = composeStories(stories)

// Todo: consider moving this out of compoents test
describe('BenefitAccordionGroup component tests', () => {
  it('Validate SourceIsEnglish results in the display of (en inglés)', () => {
    const content = '(en inglés)'
    cy.mount(<SourceIsEnglish />)
    cy.get('.bf-usa-link').then(links => {
      cy.wrap(links[0]).should('contain', content)
      cy.wrap(links[1]).should('not.contain', content)
    })
  })
})
