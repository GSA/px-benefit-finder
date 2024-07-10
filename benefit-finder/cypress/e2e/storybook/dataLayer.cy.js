/// <reference types="cypress" />
import * as utils from '../../support/utils.js'
import { dataLayerUtils } from '../../../src/shared/utils'
import { pageObjects } from '../../support/pageObjects'
import * as EN_LOCALE_DATA from '../../../../benefit-finder/src/shared/locales/en/en.json'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

const {
  intro,
  lifeEventSection,
  resultsView,
  benefitCount,
  openAllBenefitAccordions,
} = dataLayerUtils.dataLayerStructure

const dataLayerValues = [
  {
    event: intro.event,
    bfData: {
      pageView: intro.bfData.pageView,
      viewTitle: 'Benefit finder: death of a loved one',
    },
  },
  {
    event: lifeEventSection.event,
    bfData: {
      pageView: `${lifeEventSection.bfData.pageView}-1`,
      viewTitle: 'About the applicant',
    },
  },
  {
    event: resultsView.event,
    bfData: {
      pageView: resultsView.bfData.pageView[0],
      viewTitle: 'Your potential benefits',
      eligibleBenefitCount: { number: 4, string: '4' },
      moreInfoBenefitCount: { number: 1, string: '1' },
      notEligibleBenefitCount: { number: 25, string: '25' },
    },
  },
  {
    event: openAllBenefitAccordions.event,
    bfData: {
      accordionsOpen: openAllBenefitAccordions.bfData.accordionsOpen,
    },
  },
]

describe('Basic Data Layer Checks', () => {
  it('has a dataLayer and loads GTM', () => {
    cy.visit(utils.storybookUri)
    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      assert.isDefined(
        window.dataLayer.find(x => x.event === 'gtm.js'),
        'GTM is loaded'
      )
    })
  })
})

describe('Calls to Google Analytics Object', function () {
  it('homepage has a bf_page_change event', function () {
    cy.visit(utils.storybookUri)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.intro.button)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          delete ev['gtm.uniqueEventId']

          expect(ev).to.deep.equal(dataLayerValues[0])
        })
    })
  })

  it('homepage has a bf_page_change event', function () {
    cy.visit(utils.storybookUri)
    pageObjects.button().contains(EN_LOCALE_DATA.intro.button).click()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          delete ev['gtm.uniqueEventId']

          expect(dataLayerValues[1]).to.deep.equal(ev)
        })
    })
  })

  it('results page has a bf_page_change and bf_count events', function () {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
    const enResults = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.results
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`${utils.storybookUri}${scenario}`)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .benefitsAccordion()
        .filter(':visible')
        .should('have.length', enResults.eligible.length)
        .then(() => {
          // we wait for the last event to fire
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000).then(() => {
            // check last page change event
            const ev = {
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValues[2].event
              ),
            }
            delete ev[0]['gtm.uniqueEventId']

            expect(ev[0]).to.deep.equal(dataLayerValues[2])

            // // check count event
            // const evCount = {
            //   ...window.dataLayer.filter(
            //     x => x.event === dataLayerValues[2].event
            //   ),
            // }

            // delete evCount[0]['gtm.uniqueEventId']

            // expect(dataLayerValues[3]).to.deep.equal(evCount[0])
          })
        })
    })
  })

  it('clicking open all on results page has a bf_open_all_accordions event', function () {
    const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
    const scenario = utils.encodeURIFromObject(selectedData)
    cy.visit(`${utils.storybookUri}${scenario}`)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .expandAll()
        .click()
        .then(() => {
          // check last page change event
          const ev = {
            ...window.dataLayer.filter(
              x => x?.event === dataLayerValues[3].event
            ),
          }
          delete ev[0]['gtm.uniqueEventId']

          expect(dataLayerValues[3]).to.deep.equal(ev[0])
        })

      pageObjects
        .expandAll()
        .click()
        .then(() => {
          // check last page change event
          const ev = {
            ...window.dataLayer.filter(
              x => x?.event === dataLayerValues[3].event
            ),
          }
          // we ignore dedup here so there can be multiple fires
          delete ev[1]['gtm.uniqueEventId']

          expect(dataLayerValues[4]).to.not.deep.equal(ev[1])
        })
    })
  })
})
