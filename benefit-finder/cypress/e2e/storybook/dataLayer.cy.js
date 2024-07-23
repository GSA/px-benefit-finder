/// <reference types="cypress" />
import * as utils from '../../support/utils.js'
import { dataLayerUtils } from '../../../src/shared/utils'
import { pageObjects } from '../../support/pageObjects'
import * as EN_LOCALE_DATA from '../../../../benefit-finder/src/shared/locales/en/en.json'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'
import content from '../../../src/shared/api/mock-data/current.json'

const { intro, lifeEventSection, resultsView, openAllBenefitAccordions } =
  dataLayerUtils.dataLayerStructure

const { lifeEventForm } = content.data

const selectedData = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.param
const enResults = BENEFITS_ELIBILITY_DATA.scenario_1_covid.en.results
const scenario = utils.encodeURIFromObject(selectedData)

const eligibilityCount = {
  eligibleBenefitCount: {
    number: enResults.eligible.length,
    string: `${enResults.eligible.length}`,
  },
  moreInfoBenefitCount: {
    number: enResults.moreInformationNeeded.length,
    string: `${enResults.moreInformationNeeded.length}`,
  },
  notEligibleBenefitCount: {
    number:
      enResults.total_benefits -
      (enResults.eligible.length + enResults.moreInformationNeeded.length),
    string: `${
      enResults.total_benefits -
      (enResults.eligible.length + enResults.moreInformationNeeded.length)
    }`,
  },
}

const dataLayerValues = [
  {
    event: intro.event,
    bfData: {
      pageView: intro.bfData.pageView,
      viewTitle: lifeEventForm.title,
    },
  },
  {
    event: lifeEventSection.event,
    bfData: {
      pageView: `${lifeEventSection.bfData.pageView}-1`,
      viewTitle: lifeEventForm.sectionsEligibilityCriteria[0].section.heading,
    },
  },
  {
    event: resultsView.event,
    bfData: {
      pageView: resultsView.bfData.pageView[0],
      viewTitle: EN_LOCALE_DATA.resultsView.eligible.chevron.heading,
      ...eligibilityCount,
    },
  },
  {
    event: resultsView.event,
    bfData: {
      pageView: resultsView.bfData.pageView[1],
      viewTitle: EN_LOCALE_DATA.resultsView.notEligible.chevron.heading,
      ...eligibilityCount,
    },
  },
  {
    event: openAllBenefitAccordions.event,
    bfData: {
      accordionsOpen: openAllBenefitAccordions.bfData.accordionsOpen,
    },
  },
  {
    event: 'bf_accordion_open',
    bfData: {
      benefitTitle: enResults.eligible.eligible_benefits[0],
    },
  },
  {
    event: 'bf_benefit_link',
    bfData: {
      benefitTitle: enResults.eligible.eligible_benefits[0],
    },
  },
]

// check incrmenting events
// check modal event
// check benefit accordion event
// check benefitLink event

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

  it('results page with eligible benefits has a bf_page_change and bf_count events', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .benefitsAccordion()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValues[2].bfData.eligibleBenefitCount.number
        )
        .then(() => {
          // we wait for the last event to fire
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(100).then(() => {
            // check last page change event
            const ev = {
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValues[2].event
              ),
            }
            delete ev[0]['gtm.uniqueEventId']

            expect(ev[0]).to.deep.equal(dataLayerValues[2])
          })
        })
    })
  })

  it('clicking an accordion on the results page with eligible benefits has a bf_accordion_open event', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .benefitsAccordion()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValues[2].bfData.eligibleBenefitCount.number
        )
        .then(() => {
          pageObjects.accordion(enResults.eligible.eligible_benefits[0]).click()
          // we wait for the last event to fire
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(100).then(() => {
            // check last page change event
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValues[5].event
              ),
            ]
            delete ev[0]['gtm.uniqueEventId']

            expect(ev[0]).to.deep.equal(dataLayerValues[5])
          })
        })
    })
  })

  it('clicking a obfuscated link in an open accordion on the results page with eligible benefits has a bf_benefit_link event', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .benefitsAccordion()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValues[2].bfData.eligibleBenefitCount.number
        )
        .then(() => {
          pageObjects.accordion(enResults.eligible.eligible_benefits[0]).click()
          // we wait for the last event to fire
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(100).then(() => {
            // check last page change event
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValues[5].event
              ),
            ]
            delete ev[0]['gtm.uniqueEventId']

            expect(ev[0]).to.deep.equal(dataLayerValues[5])
          })

          pageObjects
            .benefitsAccordionLink(enResults.eligible.eligible_benefits[0])
            .invoke('removeAttr', 'href')
            .click()
            .then(() => {
              const ev = [
                ...window.dataLayer.filter(
                  x => x?.event === dataLayerValues[6].event
                ),
              ]
              delete ev[0]['gtm.uniqueEventId']
              expect(ev[0]).to.deep.equal(dataLayerValues[6])
            })
        })
    })
  })

  it('results page with not eligible benefits has a bf_page_change and bf_count events', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)

    // click not eligible benefits view
    pageObjects.notEligibleResultsButton().click()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .benefitsAccordion()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValues[3].bfData.notEligibleBenefitCount.number +
            dataLayerValues[3].bfData.moreInfoBenefitCount.number
        )
        .then(() => {
          // we wait for the last event to fire
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(100).then(() => {
            // check last page change event
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValues[3].event
              ),
            ]
            delete ev[1]['gtm.uniqueEventId']
            console.log(ev[1])

            expect(ev[1]).to.deep.equal(dataLayerValues[3])
          })
        })
    })
  })

  it('clicking open all on results page has a bf_open_all_accordions event', function () {
    const scenario = utils.encodeURIFromObject(selectedData)

    cy.visit(`${utils.storybookUri}${scenario}`)

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .expandAll()
        .click()
        .then(() => {
          // check last page change event
          const ev = [
            ...window.dataLayer.filter(
              x => x?.event === dataLayerValues[4].event
            ),
          ]
          console.log(ev)
          delete ev[0]['gtm.uniqueEventId']

          expect(ev[0]).to.deep.equal(dataLayerValues[4])
        })

      pageObjects
        .expandAll()
        .click()
        .then(() => {
          // check last page change event
          const ev = [
            ...window.dataLayer.filter(
              x => x?.event === dataLayerValues[4].event
            ),
          ]
          console.log(ev)
          // we ignore dedup here so there can be multiple fires
          delete ev[1]['gtm.uniqueEventId']

          expect(ev[1].bfData.accordionsOpen).to.equal(
            !dataLayerValues[4].bfData.accordionsOpen
          )
        })
    })
  })
})
