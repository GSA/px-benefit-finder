/// <reference types="Cypress" />

import * as utils from '../../support/utils.js'
import { dataLayerUtils } from '../../../src/shared/utils'
import { pageObjects } from '../../support/pageObjects'
import * as EN_LOCALE_DATA from '../../../../benefit-finder/src/shared/locales/en/en.json'
import * as BENEFITS_ELIGIBILITY_DATA from '../../fixtures/benefits-eligibility.json'
import content from '../../../src/shared/api/mock-data/current.json'
import * as EN_DOLO_MOCK_DATA from '../../../../benefit-finder/src/shared/api/mock-data/current.json'

// establish some common data points from our mock values and scenarios
const {
  intro,
  lifeEventSection,
  errors,
  resultsView,
  openAllBenefitAccordions,
} = dataLayerUtils.dataLayerStructure
const { lifeEventForm } = content.data
const selectedData = BENEFITS_ELIGIBILITY_DATA.scenario_1_covid.en.param
const enResults = BENEFITS_ELIGIBILITY_DATA.scenario_1_covid.en.results
const zero_benefit_view = BENEFITS_ELIGIBILITY_DATA.zero_benefit_view.en.results
const scenario = utils.encodeURIFromObject(selectedData)

// calculate out eligibility counts we expect for our event values
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

const zeroBenefitsEligibilityCount = {
  eligibleBenefitCount: {
    number: zero_benefit_view.eligible.length,
    string: `${zero_benefit_view.eligible.length}`,
  },
  moreInfoBenefitCount: {
    number: zero_benefit_view.moreInformationNeeded.length,
    string: `${zero_benefit_view.moreInformationNeeded.length}`,
  },
  notEligibleBenefitCount: {
    number:
      zero_benefit_view.total_benefits -
      (zero_benefit_view.eligible.length +
        zero_benefit_view.moreInformationNeeded.length),
    string: `${
      zero_benefit_view.total_benefits -
      (zero_benefit_view.eligible.length +
        zero_benefit_view.moreInformationNeeded.length)
    }`,
  },
}

// create an object for each of our dataLayer assertions
const dataLayerValueIntro = {
  event: intro.event,
  bfData: {
    pageView: intro.bfData.pageView,
    viewTitle: lifeEventForm.title,
  },
}

const dataLayerValueFormStepOne = {
  event: lifeEventSection.event,
  bfData: {
    pageView: `${lifeEventSection.bfData.pageView}-1`,
    viewTitle: lifeEventForm.sectionsEligibilityCriteria[0].section.heading,
  },
}

const dataLayerValueFormSubmitSuccess = {
  event: errors.event,
  bfData: {
    errors: '',
    errorCount: { number: 0, string: '0' },
    formSuccess: true,
  },
}

const dataLayerValueFormStepTwo = {
  event: lifeEventSection.event,
  bfData: {
    pageView: `${lifeEventSection.bfData.pageView}-2`,
    viewTitle: lifeEventForm.sectionsEligibilityCriteria[1].section.heading,
  },
}

const dataLayerValueResultsViewEligible = {
  event: resultsView.event,
  bfData: {
    pageView: resultsView.bfData.pageView[0],
    viewTitle: EN_LOCALE_DATA.resultsView.eligible.banner.heading,
    ...eligibilityCount,
  },
}

const dataLayerValueResultsViewNotEligible = {
  event: resultsView.event,
  bfData: {
    pageView: resultsView.bfData.pageView[1],
    viewTitle: EN_LOCALE_DATA.resultsView.notEligible.banner.heading,
    ...eligibilityCount,
  },
}

const dataLayerValueOpenAllAccordions = {
  event: openAllBenefitAccordions.event,
  bfData: {
    accordionsOpen: openAllBenefitAccordions.bfData.accordionsOpen,
  },
}

const dataLayerValueAccordionOpen = {
  event: 'bf_accordion_open',
  bfData: {
    benefitTitle: enResults.eligible.eligible_benefits[0],
  },
}

const dataLayerValueBenefitLink = {
  event: 'bf_benefit_link',
  bfData: {
    benefitTitle: enResults.eligible.eligible_benefits[0],
  },
}

const dataLayerValueFormCompletionModal = {
  event: 'bf_page_change',
  bfData: {
    pageView: 'bf-form-completion-modal',
    viewTitle: `${lifeEventForm.sectionsEligibilityCriteria[1].section.heading} modal`,
  },
}

const dataLayerValueVerifySelections = {
  event: 'bf_page_change',
  bfData: {
    pageView: 'bf-verify-selections',
    viewTitle: EN_LOCALE_DATA.verifySelectionsView.heading,
  },
}

const dataLayerValueZeroResultsViewEligible = {
  event: resultsView.event,
  bfData: {
    pageView: resultsView.bfData.pageView[0],
    viewTitle: EN_LOCALE_DATA.resultsView.zeroBenefits.eligible.banner.heading,
    ...zeroBenefitsEligibilityCount,
  },
}

const dataLayerValueZeroResultsViewNotEligible = {
  event: resultsView.event,
  bfData: {
    pageView: resultsView.bfData.pageView[1],
    viewTitle:
      EN_LOCALE_DATA.resultsView.zeroBenefits.notEligible.banner.heading,
    ...zeroBenefitsEligibilityCount,
  },
}

// create a combined dataLayer assertions array, this is what we might expect to see for a user journey value that triggers all the events expected
const dataLayerValues = [
  dataLayerValueIntro,
  dataLayerValueFormStepOne,
  dataLayerValueFormSubmitSuccess,
  dataLayerValueFormStepTwo,
  dataLayerValueFormCompletionModal,
  dataLayerValueFormSubmitSuccess,
  dataLayerValueVerifySelections,
  dataLayerValueZeroResultsViewEligible,
  dataLayerValueZeroResultsViewNotEligible,
  dataLayerValueOpenAllAccordions,
  { ...dataLayerValueOpenAllAccordions, bfData: { accordionsOpen: false } },
  dataLayerValueAccordionOpen,
  dataLayerValueBenefitLink,
]

const removeID = item => delete item['gtm.uniqueEventId']

const dateOfBirth = utils.getDateByOffset(-(18 * 365.2425 - 1))
const dateOfDeath = utils.getDateByOffset(-30)

const relationship =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[1].fieldset.inputs[0].inputCriteria.values[1].value
const maritalStatus =
  EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0].section
    .fieldsets[2].fieldset.inputs[0].inputCriteria.values[1].value

// check to make sure our data layer exists
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
          // Check for GTM load event
          cy.wrap(window.dataLayer).then(dataLayer => {
            const gtmEvent = dataLayer.find(x => x.event === 'gtm.load')
            assert.isDefined(gtmEvent, 'GTM is done loading')
          })
          cy.wrap(window.dataLayer).then(dataLayer => {
            const bfPageChangeEvent = dataLayer.find(
              x => x.event === 'bf_page_change'
            )
            assert.isDefined(bfPageChangeEvent, 'bf_page_change is loaded')

            // get the last pushed event
            const bfEventIndex = window.dataLayer.findIndex(
              x => x.event === 'bf_page_change'
            )
            const ev = { ...window.dataLayer[bfEventIndex] }
            removeID(ev)

            expect(ev).to.deep.equal(dataLayerValueIntro)
          })
        })
    })
  })

  it('first form step bf_page_change event', function () {
    cy.visit(utils.storybookUri)

    cy.navigateToAboutTheApplicantPage()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          removeID(ev)

          expect(ev).to.deep.equal(dataLayerValueFormStepOne)
        })
    })
  })

  it('second form step bf_page_change event, asserts incrementing values', function () {
    cy.visit(utils.storybookUri)

    cy.navigateToAboutTheApplicantPage()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          removeID(ev)

          expect(ev).to.deep.equal(dataLayerValueFormStepOne)

          cy.fillDetailsAboutTheApplicant({
            dateOfBirth,
            relationship,
            maritalStatus,
          })

          cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
            // get all the events in our layer that matches the event value
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValueFormStepTwo.event
              ),
            ]
            removeID(ev[2])

            expect(ev[2]).to.deep.equal(dataLayerValueFormStepTwo)
          })
        })
    })
  })

  it('clicking Continue on the final form step opens a modal and triggers the modal event', function () {
    cy.visit(utils.storybookUri)

    cy.navigateToAboutTheApplicantPage()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          removeID(ev)

          expect(ev).to.deep.equal(dataLayerValueFormStepOne)

          // fill out required fields
          cy.fillDetailsAboutTheApplicant({
            dateOfBirth,
            relationship,
            maritalStatus,
          })

          cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
            // get all the events in our layer that matches the event value
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValueFormStepTwo.event
              ),
            ]
            removeID(ev[2])

            expect(ev[2]).to.deep.equal(dataLayerValueFormStepTwo)

            cy.fillDetailsAboutTheDeceased({ dateOfDeath })

            cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
              // get all the events in our layer that matches the event value
              const ev = [
                ...window.dataLayer.filter(
                  x => x?.event === dataLayerValueFormCompletionModal.event
                ),
              ]
              removeID(ev[3])

              expect(ev[3]).to.deep.equal(dataLayerValueFormCompletionModal)
            })
          })
        })
    })
  })

  it('results page with eligible benefits has a bf_page_change and bf_count events', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)
    pageObjects.accordionHeading().should('exist')

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .accordionHeading()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValueResultsViewEligible.bfData.eligibleBenefitCount.number
        )
        .then(() => {
          cy.wrap(window.dataLayer).should(dataLayer => {
            const matchingEvents = dataLayer.filter(
              x => x?.event === dataLayerValueResultsViewEligible.event
            )

            assert.isNotEmpty(
              matchingEvents,
              'bf_page_change and bf_count events are triggered'
            )

            const ev = { ...matchingEvents[0] }
            removeID(ev)

            expect(ev).to.deep.equal(dataLayerValueResultsViewEligible)
          })
        })
    })
  })

  it('clicking an accordion on the results page with eligible benefits has a bf_accordion_open event', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)
    pageObjects.accordionHeading().should('exist')

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .accordionHeading()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValueResultsViewEligible.bfData.eligibleBenefitCount.number
        )
        .then(() => {
          pageObjects
            .accordionByTitle(enResults.eligible.eligible_benefits[0])
            .click()
          // Wait for the bf_accordion_open event dynamically
          cy.wrap(window.dataLayer).should(dataLayer => {
            // get all the events in our layer that matches the event value
            const matchingEvents = dataLayer.filter(
              x => x?.event === dataLayerValueAccordionOpen.event
            )
            assert.isNotEmpty(
              matchingEvents,
              'bf_accordion_open event is triggered'
            )

            const ev = { ...matchingEvents[0] }
            removeID(ev)

            expect(ev).to.deep.equal(dataLayerValueAccordionOpen)
          })
        })
    })
  })

  it('clicking a obfuscated link in an open accordion on the results page with eligible benefits has a bf_benefit_link event', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)
    pageObjects.accordionHeading().should('exist')

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .accordionHeading()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValueResultsViewEligible.bfData.eligibleBenefitCount.number
        )
        .then(() => {
          // Open accordion and validate bf_accordion_open event
          pageObjects
            .accordionByTitle(enResults.eligible.eligible_benefits[0])
            .click()

          cy.wrap(window.dataLayer).should(dataLayer => {
            // Find matching bf_accordion_open events
            const matchingEvents = dataLayer.filter(
              x => x?.event === dataLayerValueAccordionOpen.event
            )

            // Assert the event is triggered
            assert.isNotEmpty(
              matchingEvents,
              'bf_accordion_open event is triggered'
            )

            // Validate the details of the first matching event
            const ev = { ...matchingEvents[0] }
            removeID(ev)
            expect(ev).to.deep.equal(dataLayerValueAccordionOpen)
          })

          // Open link and validate bf_benefit_link event
          pageObjects.accordionHeading().should('exist')
          pageObjects
            .benefitsAccordionLink(enResults.eligible.eligible_benefits[0])
            .invoke('removeAttr', 'href')
            .click({ force: true })

          cy.wrap(window.dataLayer).should(dataLayer => {
            // Find matching bf_benefit_link events
            const matchingEvents = dataLayer.filter(
              x => x?.event === dataLayerValueBenefitLink.event
            )

            // Assert the event is triggered
            assert.isNotEmpty(
              matchingEvents,
              'bf_benefit_link event is triggered'
            )

            // Validate the details of the first matching event
            const ev = { ...matchingEvents[0] }
            removeID(ev)
            expect(ev).to.deep.equal(dataLayerValueBenefitLink)
          })
        })
    })
  })

  it('results page with not eligible benefits has a bf_page_change and bf_count events', function () {
    cy.visit(`${utils.storybookUri}${scenario}`)
    pageObjects.accordionHeading().should('exist')

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      // get visible benefits results
      pageObjects
        .accordionHeading()
        .filter(':visible')
        .should(
          'have.length',
          dataLayerValueResultsViewEligible.bfData.eligibleBenefitCount.number
        )
        .then(() => {
          // click not eligible benefits view
          pageObjects.notEligibleResultsButton().click()
          // Validate updated accordion count for "Not Eligible Benefits"
          pageObjects
            .accordionHeading()
            .filter(':visible')
            .should(
              'have.length',
              dataLayerValueResultsViewNotEligible.bfData
                .notEligibleBenefitCount.number +
                dataLayerValueResultsViewNotEligible.bfData.moreInfoBenefitCount
                  .number
            )

          // get all the events in our layer that matches the event value
          cy.wrap(window.dataLayer).should(dataLayer => {
            const matchingEvents = dataLayer.filter(
              x => x?.event === dataLayerValueResultsViewNotEligible.event
            )
            assert.isNotEmpty(
              matchingEvents,
              'bf_page_change and bf_count events are triggered'
            )

            const bfEventIndex = matchingEvents.findIndex(
              x =>
                x.bfData.viewTitle ===
                dataLayerValueResultsViewNotEligible.bfData.viewTitle
            )
            removeID(matchingEvents[bfEventIndex])

            expect(matchingEvents[bfEventIndex]).to.deep.equal(
              dataLayerValueResultsViewNotEligible
            )
          })
        })
    })
  })

  it('clicking Continue on the final form step opens a modal, clicking Review selections loads the verification view and a bf_page_change event', function () {
    cy.visit(utils.storybookUri)

    cy.navigateToAboutTheApplicantPage()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          removeID(ev)

          expect(ev).to.deep.equal(dataLayerValueFormStepOne)

          // fill out required fields
          cy.fillDetailsAboutTheApplicant({
            dateOfBirth,
            relationship,
            maritalStatus,
          })

          cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
            // get all the events in our layer that matches the event value
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValueFormStepTwo.event
              ),
            ]
            removeID(ev[2])

            expect(ev[2]).to.deep.equal(dataLayerValueFormStepTwo)

            // Date of death - 30 days ago
            cy.fillDetailsAboutTheDeceased({ dateOfDeath })

            cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
              // get all the events in our layer that matches the event value
              const ev = [
                ...window.dataLayer.filter(
                  x => x?.event === dataLayerValueFormCompletionModal.event
                ),
              ]
              removeID(ev[3])

              expect(ev[3]).to.deep.equal(dataLayerValueFormCompletionModal)

              cy.clickButton('Review your selections').then(() => {
                // get all the events in our layer that matches the event value
                const ev = [
                  ...window.dataLayer.filter(
                    x => x?.event === dataLayerValueVerifySelections.event
                  ),
                ]
                removeID(ev[4])

                expect(ev[4]).to.deep.equal(dataLayerValueVerifySelections)
              })
            })
          })
        })
    })
  })

  it('clicking open all on results page has a bf_open_all_accordions event', function () {
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
              x => x?.event === dataLayerValueOpenAllAccordions.event
            ),
          ]
          removeID(ev[0])

          expect(ev[0]).to.deep.equal(dataLayerValueOpenAllAccordions)
        })

      pageObjects
        .expandAll()
        .click()
        .then(() => {
          // get all the events in our layer that matches the event value
          const ev = [
            ...window.dataLayer.filter(
              x => x?.event === dataLayerValueOpenAllAccordions.event
            ),
          ]
          removeID(ev[1])

          expect(ev[1].bfData.accordionsOpen).to.equal(
            !dataLayerValueOpenAllAccordions.bfData.accordionsOpen
          )
        })
    })
  })

  it('navigating through all the form results in zeroBenefits views', function () {
    cy.visit(utils.storybookUri)

    cy.navigateToAboutTheApplicantPage()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          removeID(ev)

          expect(ev).to.deep.equal(dataLayerValueFormStepOne)

          // fill out required fields
          cy.fillDetailsAboutTheApplicant({
            dateOfBirth,
            relationship,
            maritalStatus,
          })

          cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
            // get all the events in our layer that matches the event value
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValueFormStepTwo.event
              ),
            ]
            removeID(ev[2])

            expect(ev[2]).to.deep.equal(dataLayerValueFormStepTwo)

            cy.fillDetailsAboutTheDeceased({ dateOfDeath })

            cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
              const ev = [
                ...window.dataLayer.filter(
                  x => x?.event === dataLayerValueFormCompletionModal.event
                ),
              ]
              removeID(ev[3])

              expect(ev[3]).to.deep.equal(dataLayerValueFormCompletionModal)

              cy.clickButton('Review your selections').then(() => {
                // get all the events in our layer that matches the event value
                const ev = [
                  ...window.dataLayer.filter(
                    x => x?.event === dataLayerValueVerifySelections.event
                  ),
                ]
                removeID(ev[4])

                expect(ev[4]).to.deep.equal(dataLayerValueVerifySelections)

                cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
                  // get all the events in our layer that matches the event value
                  const ev = [
                    ...window.dataLayer.filter(
                      x =>
                        x?.event === dataLayerValueZeroResultsViewEligible.event
                    ),
                  ]
                  removeID(ev[5])

                  expect(ev[5]).to.deep.equal(
                    dataLayerValueZeroResultsViewEligible
                  )

                  pageObjects
                    .seeAllBenefitsButton()
                    .click()
                    .then(() => {
                      // get all the events in our layer that matches the event value
                      const ev = [
                        ...window.dataLayer.filter(
                          x =>
                            x?.event ===
                            dataLayerValueZeroResultsViewNotEligible.event
                        ),
                      ]
                      removeID(ev[6])

                      expect(ev[6]).to.deep.equal(
                        dataLayerValueZeroResultsViewNotEligible
                      )
                    })
                })
              })
            })
          })
        })
    })
  })

  it('navigating through all the test steps produces a deep equal comparison to our expected dataLayer array values', function () {
    cy.visit(utils.storybookUri)

    cy.navigateToAboutTheApplicantPage()

    cy.window().then(window => {
      assert.isDefined(window.dataLayer, 'window.dataLayer is defined')

      pageObjects
        .button()
        .contains(EN_LOCALE_DATA.buttonGroup[1].value)
        .then(() => {
          // get the last pushed event
          const ev = { ...window.dataLayer[window.dataLayer.length - 1] }
          // delete ev['gtm.uniqueEventId']
          removeID(ev)

          expect(ev).to.deep.equal(dataLayerValueFormStepOne)

          // fill out required fields
          cy.fillDetailsAboutTheApplicant({
            dateOfBirth,
            relationship,
            maritalStatus,
          })

          cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
            // get the last pushed event
            const ev = [
              ...window.dataLayer.filter(
                x => x?.event === dataLayerValueFormStepTwo.event
              ),
            ]

            // delete ev[2]['gtm.uniqueEventId']
            removeID(ev[2])

            expect(ev[2]).to.deep.equal(dataLayerValueFormStepTwo)

            cy.fillDetailsAboutTheDeceased({ dateOfDeath })

            cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
              const ev = [
                ...window.dataLayer.filter(
                  x => x?.event === dataLayerValueFormCompletionModal.event
                ),
              ]

              // delete ev[3]['gtm.uniqueEventId']
              removeID(ev[3])

              expect(ev[3]).to.deep.equal(dataLayerValueFormCompletionModal)

              cy.clickButton('Review your selections').then(() => {
                const ev = [
                  ...window.dataLayer.filter(
                    x => x?.event === dataLayerValueVerifySelections.event
                  ),
                ]

                // delete ev[4]['gtm.uniqueEventId']
                removeID(ev[4])

                expect(ev[4]).to.deep.equal(dataLayerValueVerifySelections)

                cy.clickButton(EN_LOCALE_DATA.buttonGroup[1].value).then(() => {
                  const ev = [
                    ...window.dataLayer.filter(
                      x =>
                        x?.event === dataLayerValueZeroResultsViewEligible.event
                    ),
                  ]
                  removeID(ev[5])

                  expect(ev[5]).to.deep.equal(
                    dataLayerValueZeroResultsViewEligible
                  )

                  pageObjects
                    .seeAllBenefitsButton()
                    .click()
                    .then(() => {
                      const ev = [
                        ...window.dataLayer.filter(
                          x =>
                            x?.event ===
                            dataLayerValueZeroResultsViewNotEligible.event
                        ),
                      ]
                      removeID(ev[6])

                      expect(ev[6]).to.deep.equal(
                        dataLayerValueZeroResultsViewNotEligible
                      )
                    })
                  // confirm zero benefits event and view
                  // click see all benefits
                  pageObjects
                    .expandAll()
                    .click()
                    .then(() => {
                      // check last page change event
                      const ev = [
                        ...window.dataLayer.filter(
                          x =>
                            x?.event === dataLayerValueOpenAllAccordions.event
                        ),
                      ]
                      removeID(ev[0])

                      expect(ev[0]).to.deep.equal(
                        dataLayerValueOpenAllAccordions
                      )
                      pageObjects
                        .expandAll()
                        .click()
                        .then(() => {
                          // check last page change event
                          const ev = [
                            ...window.dataLayer.filter(
                              x =>
                                x?.event ===
                                dataLayerValueOpenAllAccordions.event
                            ),
                          ]

                          // we ignore dedupe here so there can be multiple fires
                          removeID(ev[1])

                          expect(ev[1].bfData.accordionsOpen).to.equal(
                            !dataLayerValueOpenAllAccordions.bfData
                              .accordionsOpen
                          )

                          pageObjects
                            .accordionByTitle(
                              enResults.eligible.eligible_benefits[0]
                            )
                            .click()
                          cy.wrap(window.dataLayer).should(dataLayer => {
                            const matchingEvents = dataLayer.filter(
                              x =>
                                x?.event === dataLayerValueAccordionOpen.event
                            )
                            assert.isNotEmpty(
                              matchingEvents,
                              'bf_accordion_open event is triggered'
                            )
                          })

                          // check last page change event
                          cy.wrap(window.dataLayer).then(dataLayer => {
                            const ev = dataLayer.filter(
                              x =>
                                x?.event === dataLayerValueAccordionOpen.event
                            )[0]

                            removeID(ev)

                            expect(ev).to.deep.equal(
                              dataLayerValueAccordionOpen
                            )
                          })

                          pageObjects
                            .benefitsAccordionLink(
                              enResults.eligible.eligible_benefits[0]
                            )
                            .invoke('removeAttr', 'href')
                            .click()
                            .then(() => {
                              const ev = [
                                ...window.dataLayer.filter(
                                  x =>
                                    x?.event === dataLayerValueBenefitLink.event
                                ),
                              ]
                              // delete ev[0]['gtm.uniqueEventId']
                              removeID(ev[0])
                              expect(ev[0]).to.deep.equal(
                                dataLayerValueBenefitLink
                              )

                              // loop through the data layer and remove any events that are gtm

                              const bfDataLayer = window.dataLayer.filter(
                                item => !item.event.includes('gtm')
                              )

                              const cleanBfDataLayer = bfDataLayer.map(item => {
                                removeID(item)
                                return item
                              })

                              expect(cleanBfDataLayer).to.deep.equal(
                                dataLayerValues
                              )
                            })
                        })
                    })
                })
              })
            })
          })
        })
    })
  })
})
