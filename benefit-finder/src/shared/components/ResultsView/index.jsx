import { useEffect, useState } from 'react'
import { useResetElement, useCrazyEggUpdate } from '@hooks'
import * as apiCalls from '@api/apiCalls'
import PropTypes from 'prop-types'
import { Results } from './components/index'
import { dataLayerUtils, handleSurvey } from '@utils'
// import './_index.scss'

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
  const { resultsView } = dataLayerUtils.dataLayerStructure

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

  // handle CrazyEgg
  useCrazyEggUpdate({
    pageView:
      notEligibleView === true
        ? resultsView.bfData.pageView[1]
        : resultsView.bfData.pageView[0],
    notEligibleView,
  })

  // handle dataLayer
  useEffect(() => {
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
              ? (zeroBenefitsResult &&
                  ui.zeroBenefits.eligible.chevron.heading) ||
                ui?.eligible.chevron.heading
              : (zeroBenefitsResult &&
                  ui?.zeroBenefits.notEligible.chevron.heading) ||
                ui?.notEligible.chevron.heading,
          ...eligibilityCount,
        },
      })
  }, [notEligibleView, eligibilityCount])

  useEffect(() => {
    // show the survey
    handleSurvey({ hide: false })
  }, [])

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
      <Results
        handleStepBack={handleStepBack}
        notEligibleView={notEligibleView}
        zeroBenefitsResult={zeroBenefitsResult}
        stepDataArray={stepDataArray}
        handleViewToggle={handleViewToggle}
        isExpandAll={isExpandAll}
        setExpandAll={setExpandAll}
        relevantBenefits={relevantBenefits}
        resetElement={resetElement}
        data={data}
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
