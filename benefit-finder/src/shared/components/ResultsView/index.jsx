import { useEffect, useState } from 'react'
import { useResetElement } from '../../hooks'
import * as apiCalls from '../../api/apiCalls'
import PropTypes from 'prop-types'
import {
  BenefitAccordionGroup,
  Button,
  EmailTrigger,
  Heading,
  StepBackLink,
  Chevron,
  ShareButton,
  RelativeBenefitList,
  Summary,
} from '../index'
import { createMarkup } from '../../utils'
import './_index.scss'

/**
 * a functional component that renders a view of the form benefit state values
 * @component
 * @param {function} handlStepBack inherited ui translations
 * @param {object} ui inherited ui translations
 * @param {array} data inherited benefits data
 * @param {func} setBenefitsArray inherited state handler
 * @param {array} stepDataArray inherited state of inupt values from form entry
 * @return {html} returns a view page of filtered benefits
 */
const ResultsView = ({
  handleStepBack,
  ui,
  data,
  stepDataArray,
  relevantBenefits,
}) => {
  const {
    stepBackLink,
    notEligible,
    eligible,
    notEligibleResults,
    resultsRelativeBenefits,
    shareResults,
    summaryBox,
  } = ui

  const [notEligibleView, setnotEligibleView] = useState(false)
  const [eligibilityCount, setEligibilityCount] = useState({
    eligible: 0,
    notEligible,
    moreInfo: 0,
  })

  const resetElement = useResetElement()

  useEffect(() => {
    resetElement.current?.focus()
  }, [resetElement])

  // some data-analytics numbers
  // how many questions were values provided for
  const criteriaValues =
    stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray).length
  // how many total questions were in the form
  const benefitsLength =
    stepDataArray &&
    apiCalls.GET.ElegibilityByCriteria(
      apiCalls.GET.SelectedValueAll(stepDataArray),
      data
    ).length

  // filter results by eligiblity status/label
  const handleEligibilityLength = text => {
    const matches = []
    const benefits = document.querySelectorAll('.bf-accordion-sub-heading')
    // match eligibility with label values
    for (const div of benefits) {
      if (div.textContent.includes(text)) {
        matches.push(div)
      }
    }
    return matches.length
  }

  const handleViewToggle = () => {
    setnotEligibleView(!notEligibleView)
    window.scrollTo(0, 0)
    resetElement.current.focus()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setEligibilityCount({
      eligible: handleEligibilityLength(
        ui.benefitAccordion.eligibleStatusLabels[0]
      ),
      moreInfo: handleEligibilityLength(
        ui.benefitAccordion.eligibleStatusLabels[1]
      ),
      notEligible: handleEligibilityLength(
        ui.benefitAccordion.eligibleStatusLabels[2]
      ),
    })
  }, [])

  // handle dataLayer
  useEffect(() => {
    window.dataLayer &&
      window.dataLayer.push({
        event: 'bf_page_change',
        bfData: {
          pageView: 'bf-result-view',
          viewTitle:
            notEligibleView === false
              ? eligible.chevron.heading
              : notEligible.chevron.heading,
          viewState:
            notEligibleView === true
              ? 'bf-not-eligible-view'
              : 'bf-eligible-view',
        },
      })
  }, [notEligibleView])

  useEffect(() => {
    eligibilityCount.notEligible >= 0 &&
      window.dataLayer &&
      window.dataLayer.push({ event: 'bf_count', bfData: eligibilityCount })
  }, [eligibilityCount])

  // compare the selected criteria array with benefits
  return (
    <div
      className="bf-result-view"
      data-testid="bf-result-view"
      data-analytics="bf-result-view"
      data-analytics-content={
        notEligibleView === true ? 'bf-not-eligible-view' : 'bf-eligible-view'
      }
      data-analytics-content-criteria-values={criteriaValues}
      data-analytics-content-benefits={benefitsLength}
      data-analytics-content-eligible={eligibilityCount.eligible}
      data-analytics-content-not-eligible={eligibilityCount.notEligible}
      data-analytics-content-more-info={eligibilityCount.moreInfo}
    >
      <Chevron
        heading={
          notEligibleView === false
            ? eligible.chevron.heading
            : notEligible.chevron.heading
        }
        description={
          notEligibleView === false
            ? eligible.chevron.description
            : notEligible.chevron.description
        }
      />
      <div className="bf-grid-container grid-container">
        <div className="bf-result-view-details">
          {notEligibleView === false ? (
            <StepBackLink
              onClick={() => resetElement.current.focus()}
              setCurrent={handleStepBack}
            >
              {stepBackLink}
            </StepBackLink>
          ) : (
            <Button
              className="bf-step-back-link"
              onClick={() => handleViewToggle()}
              unstyled
            >
              {stepBackLink}
            </Button>
          )}
          <Heading className="bf-result-view-heading" headingLevel={2}>
            {notEligibleView ? notEligible.heading : eligible.heading}
          </Heading>
          <Heading
            className="bf-result-view-description"
            headingLevel={3}
            dangerouslySetInnerHTML={
              notEligibleView
                ? createMarkup(notEligible.description)
                : createMarkup(eligible.description)
            }
          />
          <Summary
            heading={summaryBox.heading}
            listItems={summaryBox.list}
            cta={summaryBox.cta}
          />
          {/* map all the benefits into cards */}
          <div className="bf-result-view-benefits">
            <BenefitAccordionGroup
              data={
                stepDataArray &&
                apiCalls.GET.ElegibilityByCriteria(
                  apiCalls.GET.SelectedValueAll(stepDataArray),
                  data
                )
              }
              entryKey={'benefit'}
              notEligibleView={notEligibleView}
              expandAll
              ui={ui}
            />
          </div>
          {notEligibleView === false && (
            <div className="bf-result-view-unmet">
              <Heading
                className="bf-result-view-unmet-heading"
                headingLevel={3}
              >
                {notEligibleResults?.heading}
              </Heading>
              <p
                dangerouslySetInnerHTML={createMarkup(
                  notEligibleResults?.description
                )}
              />
              <Button secondary onClick={handleViewToggle}>
                {notEligibleResults?.cta}
              </Button>
            </div>
          )}
          {relevantBenefits?.length > 0 && (
            <div className="bf-result-view-relvant-benefits">
              <Heading
                className="bf-result-view-relvant-benefits-heading"
                headingLevel={3}
              >
                {resultsRelativeBenefits?.heading}
              </Heading>
              {relevantBenefits && (
                <RelativeBenefitList
                  data={relevantBenefits}
                  carrotType="carrot-big"
                ></RelativeBenefitList>
              )}
            </div>
          )}
          <div className="bf-result-view-share-results">
            <Heading
              className="bf-result-view-share-results-heading"
              headingLevel={3}
            >
              {shareResults?.heading}
            </Heading>
            <p>{shareResults?.description}</p>
            <div className="bf-result-view-share-results-button-group">
              <ShareButton
                ui={shareResults}
                data={
                  stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)
                }
              />
              <EmailTrigger
                ui={shareResults}
                data={
                  stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ResultsView.propTypes = {
  handleStepBack: PropTypes.func,
  ui: PropTypes.object,
  data: PropTypes.array,
}

export default ResultsView
