/// <reference types="cypress" />

import * as utils from '../../support/utils.js'
import * as EN_LOCALE_DATA from '../../../src/shared/locales/en/en.json'
import * as EN_DOLO_MOCK_DATA from '../../../src/shared/api/mock-data/current.json'
import { pageObjects } from '../../support/pageObjects.js'

const dob = utils.getDateByOffset(-(18 * 365.2425 - 1))
const dod = utils.getDateByOffset(-30)

const relation =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
const status =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value

describe('Validate scrolling when modal is open', () => {
  it('Should disable body from scrolling when model is open', () => {
    cy.visit(utils.storybookUri)
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()
    utils.dataInputs({ dob, relation, status })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    utils.dataInputs({ dod })
    pageObjects.button().contains(EN_LOCALE_DATA.buttonGroup[1].value).click()
    // cy.get('#benefit-finder').trigger('wheel', {
    //   deltaY: -66.666666,
    //   wheelDelta: 120,
    //   wheelDeltaX: 0,
    //   wheelDeltaY: 120,
    //   bubbles: true,
    // })
    cy.get('#benefit-finder').should('be.hidden')
    // cy.get('#benefit-finder').trigger('wheel', {
    //   deltaY: 66.666666,
    //   wheelDelta: 120,
    //   wheelDeltaX: 0,
    //   wheelDeltaY: 120,
    //   bubbles: true,
    // })
    // cy.window().then($el =>
    //   expect($el.document.body.style.overflow).to.eq('hidden')
    // )

    // cy.get('.ReactModal__Overlay').scrollTo('bottom', err => {
    //   console.log(err)
    // })
    // cy.get('.ReactModal__Overlay').shouldNotBeActionable({ p: 'bottom' }, done)

    // cy.once("fail", (err) => {
    //   expect(err.message).to.include("`cy.click()` failed because this element");
    //   expect(err.message).to.include("is being covered by another element");
    //   done();
    // });
    // cy.scrollTo('bottom')
  })
})
