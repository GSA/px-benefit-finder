import { useEffect, useState } from 'react'
import { useResetElement } from '../../hooks'
import * as apiCalls from '../../api/apiCalls'
import PropTypes from 'prop-types'
import {
  BenefitAccordionGroup,
  Button,
  EmailButton,
  Heading,
  StepBackLink,
  Chevron,
  ShareButton,
  RelativeBenefitList,
} from '../index'
import {
  ZeroBenefitsHeadingBlock,
  EligibleBenefitsHeadingBlock,
  NotEligibleBenefitsHeadingBlock,
} from './components/index'
import { createMarkup, dataLayerUtils } from '../../utils'
import './_index.scss'

// Results View is a single view with three states, eligible, not eligible, and zero benefits

/**
 * a functional component that renders a view of the form benefit state values
 * @component
 * @param {function} handlStepBack inherited ui translations
 * @param {func} setBenefitsArray inherited state handler
 * @param {array} stepDataArray inherited state of inupt values from form entry
 * @param {object} ui inherited ui translations
 * @param {array} data inherited benefits data
 * @return {html} returns a view page of filtered benefits
 */
const ResultsView = ({
  handleStepBack,
  stepDataArray,
  relevantBenefits,
  ui,
  data,
}) => {
  const [notEligibleView, setnotEligibleView] = useState(false)
  const [eligibilityCount, setEligibilityCount] = useState(null)

  /**
   * a hook that hanldes our open state of the accordions in our group
   * @function
   * @return {boolean} returns true or false
   */
  const [isExpandAll, setExpandAll] = useState(false)

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
    return { number: matches.length, string: `${matches.length}` }
  }

  const handleViewToggle = () => {
    setExpandAll(false)
    setnotEligibleView(!notEligibleView)
    window.scrollTo(0, 0)
    resetElement.current.focus()
  }

  const zeroBenefitsResult = eligibilityCount?.eligibleBenefitCount.number === 0

  // Results view components
  const ResultsViewChevronBlock = ({
    notEligibleView,
    zeroBenefitsResult,
    ui,
  }) => {
    const { eligible, notEligible, zeroBenefits } = ui
    return (
      <Chevron
        heading={
          notEligibleView === false
            ? (zeroBenefitsResult && zeroBenefits.chevron.heading) ||
              eligible.chevron.heading
            : (zeroBenefitsResult && zeroBenefits.chevron.heading) ||
              notEligible.chevron.heading
        }
        description={
          notEligibleView === false
            ? (zeroBenefitsResult && zeroBenefits.chevron.description) ||
              eligible.chevron.description
            : (zeroBenefitsResult && zeroBenefits.chevron.description) ||
              notEligible.chevron.description
        }
      />
    )
  }

  const ResultsViewHeadingBlock = ({
    zeroBenefitsResult,
    notEligibleView,
    ui,
  }) => {
    const { notEligible, eligible, summaryBox, zeroBenefits } = ui
    return zeroBenefitsResult ? (
      <ZeroBenefitsHeadingBlock
        handleViewToggle={handleViewToggle}
        notEligibleView={notEligibleView}
        ui={zeroBenefits}
      />
    ) : notEligibleView ? (
      <NotEligibleBenefitsHeadingBlock ui={{ notEligible, summaryBox }} />
    ) : (
      <EligibleBenefitsHeadingBlock ui={{ eligible, summaryBox }} />
    )
  }

  const ResultsStepBackLink = ({ notEligibleView, ui }) => {
    const { stepBackLink } = ui
    return notEligibleView === false ? (
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
    )
  }

  const ResultsNotEligibleCTA = ({ handleViewToggle, ui }) => {
    const { notEligibleResults } = ui
    return (
      <div className="bf-result-view-unmet">
        <Heading className="bf-result-view-unmet-heading" headingLevel={3}>
          {notEligibleResults?.heading}
        </Heading>
        <p
          dangerouslySetInnerHTML={createMarkup(
            notEligibleResults?.description
          )}
        />
        <Button onClick={handleViewToggle}>{notEligibleResults?.cta}</Button>
      </div>
    )
  }

  const ResultsViewShareResults = ({ stepDataArray, ui }) => {
    const { shareResults } = ui
    return (
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
            data={stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)}
          />
          <EmailButton
            ui={shareResults}
            data={stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)}
          />
        </div>
      </div>
    )
  }

  const ResultsViewRelevantBenefits = ({ relevantBenefits, ui }) => {
    const { resultsRelativeBenefits } = ui
    return (
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
    )
  }

  const ResultsViewAccordions = ({
    zeroBenefitsResult,
    notEligibleView,
    stepDataArray,
    isExpandAll,
    setExpandAll,
    ui,
  }) => {
    return (
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
          expandAll={
            zeroBenefitsResult === false ||
            (zeroBenefitsResult && notEligibleView)
          }
          isExpandAll={isExpandAll}
          setExpandAll={setExpandAll}
          ui={ui}
        />
      </div>
    )
  }

  const ResultsViewBlock = ({
    notEligibleView,
    zeroBenefitsResult,
    stepDataArray,
    isExpandAll,
    setExpandAll,
    ui,
  }) => {
    return (
      <>
        <ResultsViewChevronBlock
          notEligibleView={notEligibleView}
          zeroBenefitsResult={zeroBenefitsResult}
          ui={ui}
        />
        <div className="bf-grid-container grid-container">
          <div className="bf-result-view-details">
            <ResultsStepBackLink notEligibleView={notEligibleView} ui={ui} />

            <ResultsViewHeadingBlock
              zeroBenefitsResult={zeroBenefitsResult}
              notEligibleView={notEligibleView}
              ui={ui}
            />

            {/* map all the benefits into accordions */}
            <ResultsViewAccordions
              zeroBenefitsResult={zeroBenefitsResult}
              notEligibleView={notEligibleView}
              isExpandAll={isExpandAll}
              setExpandAll={setExpandAll}
              stepDataArray={stepDataArray}
              ui={ui}
            />

            {notEligibleView === false && zeroBenefitsResult === false && (
              <ResultsNotEligibleCTA
                notEligibleView={notEligibleView}
                zeroBenefitsResult={zeroBenefitsResult}
                handleViewToggle={handleViewToggle}
                ui={ui}
              />
            )}

            {relevantBenefits?.length > 0 && (
              <ResultsViewRelevantBenefits
                relevantBenefits={relevantBenefits}
                ui={ui}
              />
            )}

            <ResultsViewShareResults stepDataArray={stepDataArray} ui={ui} />
          </div>
        </div>
      </>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setEligibilityCount({
      eligibleBenefitCount: handleEligibilityLength(
        ui.benefitAccordion.eligibleStatusLabels[0]
      ),
      moreInfoBenefitCount: handleEligibilityLength(
        ui.benefitAccordion.eligibleStatusLabels[1]
      ),
      notEligibleBenefitCount: handleEligibilityLength(
        ui.benefitAccordion.eligibleStatusLabels[2]
      ),
    })
  }, [])

  // handle dataLayer
  useEffect(() => {
    const { resultsView } = dataLayerUtils.dataLayerStructure
    eligibilityCount !== null &&
      dataLayerUtils.dataLayerPush(window, {
        event: resultsView.event,
        bfData: {
          pageView:
            notEligibleView === true
              ? resultsView.bfData.pageView[1]
              : resultsView.bfData.pageView[0],
          viewTitle:
            notEligibleView === false
              ? (zeroBenefitsResult && ui.zeroBenefits.chevron.heading) ||
                ui?.eligible.chevron.heading
              : (zeroBenefitsResult && ui?.zeroBenefits.chevron.heading) ||
                ui?.notEligible.chevron.heading,
          ...eligibilityCount,
        },
      })
  }, [notEligibleView, eligibilityCount])

  // compare the selected criteria array with benefits and render our view
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
      data-analytics-content-eligible={
        eligibilityCount?.eligibleBenefitCount.number
      }
      data-analytics-content-not-eligible={
        eligibilityCount?.notEligibleBenefitCount.number
      }
      data-analytics-content-more-info={
        eligibilityCount?.moreInfoBenefitCount.number
      }
    >
      <ResultsViewBlock
        notEligibleView={notEligibleView}
        zeroBenefitsResult={zeroBenefitsResult}
        stepDataArray={stepDataArray}
        handleViewToggle={handleViewToggle}
        relevantBenefits={relevantBenefits}
        isExpandAll={isExpandAll}
        setExpandAll={setExpandAll}
        ui={ui}
      />
    </div>
  )
}

ResultsView.propTypes = {
  handleStepBack: PropTypes.func,
  ui: PropTypes.object,
  data: PropTypes.array,
}

export default ResultsView
