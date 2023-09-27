import { useEffect, useState } from 'react'
import * as apiCalls from '../../api/apiCalls'
import PropTypes from 'prop-types'
import {
  BenefitAccordionGroup,
  Button,
  EmailButton,
  Heading,
  StepBackLink,
  Card,
  Chevron,
  ShareButton,
  PrintButton,
} from '../index'
import createMarkup from '../../utils/createMarkup'
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
const ResultsView = ({ handleStepBack, ui, data, stepDataArray }) => {
  const {
    stepBackLink,
    notQualified,
    qualified,
    notEligibleResults,
    relativeBenefits,
    shareResults,
  } = ui

  const [notQualifiedView, setNotQualifiedView] = useState(false)

  const handleViewToggle = () => {
    setNotQualifiedView(!notQualifiedView)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // compare the selected criteria array with benefits
  return (
    <div className="result-view">
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
      <div className="grid-container">
        <div className="result-view-details">
          {notQualifiedView === false ? (
            <StepBackLink setCurrent={handleStepBack}>
              {stepBackLink}
            </StepBackLink>
          ) : (
            <Button
              className="step-back-link"
              onClick={() => setNotQualifiedView(false)}
              unstyled
            >
              {stepBackLink}
            </Button>
          )}
          <Heading headingLevel={3}>
            {notQualifiedView ? notQualified.heading : qualified.heading}
          </Heading>
          <p
            dangerouslySetInnerHTML={
              notQualifiedView
                ? createMarkup(notQualified.description)
                : createMarkup(qualified.description)
            }
          />
          {/* map all the benefits into cards */}
          <div className="result-view-benefits">
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
            />
          </div>
          {notQualifiedView === false && (
            <div className="result-view-unmet">
              <Heading headingLevel={3}>{notEligibleResults?.heading}</Heading>
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
          <div className="result-view-relvant-benefits">
            <Heading headingLevel={3}>{relativeBenefits?.heading}</Heading>
            <ul className="add-list-reset">
              <li key="benefit-card-one">
                <Card
                  className="relative-benefit-card"
                  title={'Approaching Retirement'}
                  cta={'Learn More'}
                  noCarrot
                ></Card>
              </li>
              <li key="benefit-card-two">
                <Card
                  className="relative-benefit-card"
                  title={'Living with disability or illness'}
                  cta={'Learn More'}
                  noCarrot
                ></Card>
              </li>
            </ul>
          </div>
          <div className="result-view-share-results">
            <Heading headingLevel={3}>{shareResults?.heading}</Heading>
            <div className="result-view-share-results-button-group">
              <ShareButton
                ui={shareResults?.shareButton}
                data={
                  stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)
                }
              />
              <EmailButton
                ui={shareResults?.emailButton}
                data={
                  stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)
                }
              />
              <PrintButton ui={shareResults?.printButton} />
            </div>
            <p>{shareResults?.description}</p>
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
