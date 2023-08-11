import PropTypes from 'prop-types'
import { BenefitAccordionGroup, Heading, StepBackLink } from '../index'

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
  // setBenefitsArray,
  // stepDataArray,
}) => {
  // console.log(data)
  const { heading, stepBackLink } = ui

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

  // compare the selected criteria array with benefits
  return (
    <div>
      <Heading headingLevel={2}>{heading}</Heading>
      {/* map all the benefits into cards */}
      <BenefitAccordionGroup data={data} entryKey={'benefit'} expandAll />
      {/* {data.map((item, i) => {
        return console.log(item)
      })} */}
      <StepBackLink setCurrent={handleStepBack}>{stepBackLink}</StepBackLink>
    </div>
  )
}

ResultsView.propTypes = {
  handleStepBack: PropTypes.func,
  ui: PropTypes.object,
  data: PropTypes.array,
}

export default ResultsView
