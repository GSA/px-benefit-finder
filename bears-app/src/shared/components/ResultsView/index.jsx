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
const ResultsView = ({ handleStepBack, ui, data, stepDataArray }) => {
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
  const selectedCriteria =
    stepDataArray &&
    stepDataArray
      .map((item, i) =>
        item.section.fieldsets.map(item => {
          // TODO: exludes groups for now
          if (item.fieldset.fieldsets) {
            return undefined
          }

          // find selected values
          const selected = item.fieldset.inputs[0].inputCriteria.values.find(
            value => value.selected === true
          )

          return (
            selected && {
              criteriaKey: item.fieldset.inputs[0].inputCriteria.id,
              values: selected,
            }
          )
        })
      )
      .flat() // we flatten all to have only one array
      .filter(element => element !== undefined) // remove undefined

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

  const handleData = (selectedCriteria, data) => {
    // return all eligible items
    const eligibleItems =
      data &&
      data.map(item => {
        console.log(item.benefit.eligibility)
        // find all eligibility items that are matches to criteria key
        const criteriaEligibility = item.benefit.eligibility.find(
          criteria => criteria.criteriaKey === selectedCriteria[0].criteriaKey
        )

        const isEligible =
          criteriaEligibility !== undefined &&
          criteriaEligibility.acceptableValues.find(
            value => value === selectedCriteria[0].values.value
          )

        if (isEligible === selectedCriteria[0].values.value) {
          criteriaEligibility.isEligible = true
        }

        return item
      })
    return eligibleItems
  }

  console.log('item matches', handleData(selectedCriteria, data))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data, selectedCriteria])

  // compare the selected criteria array with benefits
  return (
    <div className="result-view">
      <Chevron heading={chevron.heading} description={chevron.description} />
      <div className="result-view-details">
        <StepBackLink setCurrent={handleStepBack}>{stepBackLink}</StepBackLink>
        <Heading headingLevel={3}>{heading}</Heading>
        <p dangerouslySetInnerHTML={createMarkup(description)} />
        {/* map all the benefits into cards */}
        <div className="result-view-benefits">
          <BenefitAccordionGroup
            data={handleData(selectedCriteria, data)}
            entryKey={'benefit'}
            expandAll
          />
        </div>
        <div className="result-view-unmet">
          <Heading headingLevel={3}>{notEligibleResults?.heading}</Heading>
          <p
            dangerouslySetInnerHTML={createMarkup(
              notEligibleResults?.description
            )}
          />
          <Button>{notEligibleResults?.cta}</Button>
        </div>
        <div className="result-view-relvant-benefits">
          <Heading headingLevel={3}>{relativeBenefits?.heading}</Heading>
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
