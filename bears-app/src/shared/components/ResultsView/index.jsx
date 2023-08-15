import { useEffect } from 'react'
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
const ResultsView = ({ handleStepBack, ui, data }) => {
  // console.log(data)
  const {
    heading,
    stepBackLink,
    chevron,
    description,
    notEligibleResults,
    relativeBenefits,
    shareResults,
  } = ui

  // collect all the criteria keys and selected criteria values into an array
  // const selectedCriteria = stepDataArray
  //   .map((item, i) =>
  //     item.section.fieldsets.map(item => {
  //       return {
  //         id: item.fieldset.inputs[0].inputCriteria.id,
  //         values: item.fieldset.inputs[0].inputCriteria.values.find(
  //           value => value.selected
  //         ),
  //       }
  //     })
  //   )
  //   .flat() // we flatten all to have only one array

  // Total Criteria = y
  // Met Criteria = x
  // Not Met Criteria = z

  // Criteria Met Length	Label
  // x === y	"Likely Eligible"
  // z === 0 && x === undefined length > 0 "More Information Needed"
  // Criteria Not Met	Label
  // z > 0	"Not Eligible"

  // collect "Likely Eligible"

  // for each benefit eligiblity compare compare selectedCriteria
  // if there is a criteriakey match in a benefit
  // check that the value === acceptable values

  // function likelyEligible(selectedCriteria, data) {
  //   console.log(selectedCriteria)
  //   data.forEach((item, i) => {
  //     console.log(item.benefit.eligibility)
  //   })
  // }

  // console.log(likelyEligible(selectedCriteria, data))

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  // compare the selected criteria array with benefits
  return (
    <div className="result-view">
      <Chevron heading={chevron.heading} description={chevron.description} />
      <div className="result-view-details">
        <StepBackLink setCurrent={handleStepBack}>{stepBackLink}</StepBackLink>
        <Heading headingLevel={2}>{heading}</Heading>
        <p dangerouslySetInnerHTML={createMarkup(description)} />
        {/* map all the benefits into cards */}
        <div className="result-view-benefits">
          <BenefitAccordionGroup data={data} entryKey={'benefit'} expandAll />
        </div>
        <div className="result-view-unmet">
          <Heading headingLevel={2}>{notEligibleResults?.heading}</Heading>
          <p
            dangerouslySetInnerHTML={createMarkup(
              notEligibleResults?.description
            )}
          />
          <Button>{notEligibleResults?.cta}</Button>
        </div>
        <div className="result-view-relvant-benefits">
          <Heading headingLevel={2}>{relativeBenefits?.heading}</Heading>
          <ul className="add-list-reset">
            <li>
              <Card
                className="relative-benefit-card"
                title={'Approaching Retirement'}
                cta={'Learn More'}
                noCarrot
              ></Card>
            </li>
            <li>
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
            <ShareButton ui={shareResults?.shareButton} />
            <EmailButton ui={shareResults?.emailButton} />
            <PrintButton ui={shareResults?.printButton} />
          </div>
          <p>{shareResults?.description}</p>
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
