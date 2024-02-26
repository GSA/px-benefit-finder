import { composeStories } from '@storybook/react'
import * as stories from '../index.stories'
const { Primary } = composeStories(stories)

const button = '.bf-usa-button'

describe('Button Group component tests', () => {
  it('Back button should trigger user to navigate back', () => {
    cy.mount(<Primary />)
    cy.get(button).contains('Back').click()
    cy.on('window:alert', str => {
      expect(str).to.equal(`navigate back`)
    })
  })

  it('Continue button should trigger user to navigate forward', () => {
    cy.mount(<Primary />)
    cy.get(button).contains('Continue').click()
    cy.on('window:alert', str => {
      expect(str).to.equal(`navigate forward`)
    })
  })
})
