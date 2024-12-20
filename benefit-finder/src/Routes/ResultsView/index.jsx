import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { RouteContext } from '@/App'
import { useResetElement } from '@hooks'
import * as apiCalls from '@api/apiCalls'
import PropTypes from 'prop-types'
import { Results } from './components/index'
import { dataLayerUtils, handleSurvey, domReady } from '@utils'

// Results View is a single view with three states, eligible, not eligible, and zero benefits

/**
 * a functional component that renders a view of the form benefit state values
 * @component
 * @param {func} setBenefitsArray inherited state handler
 * @param {array} stepDataArray inherited state of input values from form entry
 * @param {object} ui inherited ui translations
 * @param {array} data inherited benefits data
 * @return {html} returns a view page of filtered benefits
 */
const ResultsView = ({
  stepDataArray,
  relevantBenefits,
  ui,
  data,
  notEligibleView,
}) => {
  const [loading, setLoading] = useState(true)
  const [eligibilityCount, setEligibilityCount] = useState(null)
  const [zeroBenefitsResult, setZeroBenefitsResult] = useState(null)
  const { resultsView } = dataLayerUtils.dataLayerStructure
  const navigate = useNavigate()
  const location = useLocation()
  const ROUTES = useContext(RouteContext)

  /**
   * a hook that handles our open state of the accordions in our group
   * @function
   * @return {boolean} returns true or false
   */
  const [isExpandAll, setExpandAll] = useState(false)

  const resetElement = useResetElement()

  useEffect(() => {
    resetElement.current?.focus()
  }, [resetElement])

  // some data-test values
  // how many questions were values provided for
  const criteriaValues =
    stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray).length
  // how many total questions were in the form
  const benefitsLength =
    stepDataArray &&
    apiCalls.GET.EligibilityByCriteria(
      apiCalls.GET.SelectedValueAll(stepDataArray),
      data
    ).length

  const handleViewToggle = () => {
    location.pathname ===
    `${ROUTES.indexPath}/${ROUTES.resultsPaths.resultsPath}`
      ? navigate(-1)
      : navigate(`/${ROUTES.indexPath}/${ROUTES.resultsPaths.notEligiblePath}`)
  }

  // handle location change
  useEffect(() => {
    resetElement.current?.focus()
    window.scrollTo(0, 0)
    setExpandAll(false)
  }, [location])

  // collect benefit eligibility counts and set state
  useEffect(() => {
    apiCalls.GET.BenefitsEligibilityCounts(
      data,
      ui.benefitAccordion.eligibleStatusLabels
    ).then(response => {
      setEligibilityCount(response)
      setZeroBenefitsResult(response?.eligibleBenefitCount.number === 0)
      setLoading(false)
    })
  }, [data])

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
                  ui.zeroBenefits.eligible.banner.heading) ||
                ui?.eligible.banner.heading
              : (zeroBenefitsResult &&
                  ui?.zeroBenefits.notEligible.banner.heading) ||
                ui?.notEligible.banner.heading,
          ...eligibilityCount,
        },
      })
  }, [notEligibleView, eligibilityCount])

  useEffect(() => {
    // show the survey
    handleSurvey({ hide: false })
  }, [])

  // a few assignments to support e2e testing and debugging
  const testAttributes = {
    'data-test-results-view':
      notEligibleView === true ? 'bf-not-eligible-view' : 'bf-eligible-view',
    'data-test-results-view-criteria-values': criteriaValues,
    'data-test-results-view-benefits': benefitsLength,
    'data-test-results-view-eligible':
      eligibilityCount?.eligibleBenefitCount.number,
    'data-test-results-view-not-eligible':
      eligibilityCount?.notEligibleBenefitCount.number,
    'data-test-results-view-more-info':
      eligibilityCount?.moreInfoBenefitCount.number,
  }

  // compare the selected criteria array with benefits and render our view
  return (
    <div
      className="bf-result-view"
      data-testid="bf-result-view"
      {...testAttributes}
    >
      <Results
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
      {domReady({
        loading,
        parentElementID: 'bf-results-view',
      })}
    </div>
  )
}

ResultsView.propTypes = {
  ui: PropTypes.object,
  data: PropTypes.array,
}

export default ResultsView
