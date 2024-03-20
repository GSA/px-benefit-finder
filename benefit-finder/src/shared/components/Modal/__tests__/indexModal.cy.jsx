import { useState } from 'react'
import { composeStories } from '@storybook/react'
import * as stories from '../index.stories'
const { Primary } = composeStories(stories)

const ModalWrapper = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div style={{ height: '2000px' }}>
      <Primary setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  )
}

describe('Modal Component Tests', () => {
  it('should open modal when trigger is clicked', () => {
    cy.mount(<ModalWrapper />)
    cy.viewport(550, 750)
    cy.get('[tabindex=0]').click()
    cy.get('#benefit-finder-modal').type(
      '{upArrow}{upArrow}{downArrow}{downArrow}{leftArrow}{rightArrow}{leftArrow}{rightArrow}ba'
    )
    cy.get('body').type('{esc}')
    cy.get('body').type('{pageDown}')
    cy.get('[tabindex=0]').click()
    cy.get('body').type('{pageDown}')
  })
})
