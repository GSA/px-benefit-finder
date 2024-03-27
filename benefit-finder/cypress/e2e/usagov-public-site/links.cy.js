/// <reference types="cypress"/>

import * as utils from '../../support/utils'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

// to be removed when uncaught exceptions are addressed
describe('Verify correct status code when user navigates links', () => {
  Cypress.on('uncaught:exception', (_err, runnable) => {
    return false
  })
  it('Verify success status code response for links in Death of a loved one English page', () => {
    const selectedData =
      BENEFITS_ELIBILITY_DATA['death-of-a-loved-one'].en.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`benefit-finder/death?${scenario}`)
    cy.get('a[href]').each(link => {
      cy.request(link.prop('href'))
    })
  })

  it('Verify success status code response for links in Death of a Loved One Spanish page', () => {
    const selectedData =
      BENEFITS_ELIBILITY_DATA['death-of-a-loved-one'].es.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`es/buscador-beneficios/muerte?${scenario}`)
    cy.get('a[href]').each(link => {
      cy.request(link.prop('href'))
    })
  })

  it('Verify success status code response for links in Retirement English page', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.retirement.en.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`benefit-finder/retirement?${scenario}`)
    cy.get('a[href]').each(link => {
      cy.request(link.prop('href'))
    })
  })

  it('Verify success status code response for links in Retirement Spanish page', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.retirement.es.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`es/buscador-beneficios/jubilacion?${scenario}`)
    cy.get('a[href]').each(link => {
      cy.request(link.prop('href'))
    })
  })

  it('Verify success status code response for links in Disability English page', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.disability.en.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`benefit-finder/disability?${scenario}`)
    cy.get('a[href]').each(link => {
      cy.request(link.prop('href'))
    })
  })

  it('Verify success status code response for links in Disability English page', () => {
    const selectedData = BENEFITS_ELIBILITY_DATA.disability.es.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`es/buscador-beneficios/discapacidad?${scenario}`)
    cy.get('a[href]').each(link => {
      cy.request(link.prop('href'))
    })
  })
})
