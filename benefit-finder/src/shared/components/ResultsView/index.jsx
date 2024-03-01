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
    notQualified,
    qualified,
    notEligibleResults,
    resultsRelativeBenefits,
    shareResults,
  } = ui

  const [notQualifiedView, setNotQualifiedView] = useState(false)
  const resetElement = useResetElement()

  useEffect(() => {
    resetElement.current?.focus()
  }, [resetElement])

  const handleViewToggle = () => {
    setNotQualifiedView(!notQualifiedView)
    window.scrollTo(0, 0)
    resetElement.current.focus()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // compare the selected criteria array with benefits
  return (
    <div className="bf-result-view" data-testid="result-view">
      <Chevron
        heading={
          notQualifiedView === false
            ? qualified.chevron.heading
            : notQualified.chevron.heading
        }
        description={
          notQualifiedView === false
            ? qualified.chevron.description
            : notQualified.chevron.description
        }
      />
      <div className="bf-grid-container grid-container">
        <div className="bf-result-view-details">
          {notQualifiedView === false ? (
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
            {notQualifiedView ? notQualified.heading : qualified.heading}
          </Heading>
          <div
            className="bf-result-view-description"
            dangerouslySetInnerHTML={
              notQualifiedView
                ? createMarkup(notQualified.description)
                : createMarkup(qualified.description)
            }
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
              notQualifiedView={notQualifiedView}
              expandAll
              ui={ui}
            />
          </div>
          {notQualifiedView === false && (
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
              <Button onClick={handleViewToggle}>
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
              <EmailButton
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
