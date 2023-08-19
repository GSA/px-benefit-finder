import { useEffect, useState } from 'react'
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

  const handleDateEligibility = (conditional, selectedValue) => {
    // date values
    // "<01-01-1978"
    // "<2years (the deceased died within the last two years)"
    // "<18years"
    // ">=62years"
    // ">=60years"
    // ">=50years"
    // ">18years"

    // get the conditional
    const text = conditional
    const operators = /['>', '>=', '<', '<=', '=']/g
    const operator = text.match(operators)
    const integer = text.match(/\d+/)[0]

    // calculate back
    // get current date
    // subtract integer
    // if a date comes back in date format
    const pattern = /-/
    const conditionalDate = pattern.test(text)
      ? new window.Date(text)
      : new window.Date(
          new Date().getFullYear() - integer,
          new Date().getMonth(),
          new Date().getDate()
        )

    // getTime in milliseconds so we can do a comparison
    const epochConditionalDate = conditionalDate.getTime()

    // example selected value for date
    // const value = {
    //   year: 2022,
    //   month: 2,
    //   day: 2,
    // }

    // calculate selected
    const selectedDate = new window.Date(
      Date.UTC(selectedValue.year, selectedValue.month, selectedValue.day)
    )

    const epochSelectedDate = selectedDate.getTime()

    const isDateEligible = (
      operator,
      epochSelectedDate,
      epochConditionalDate
    ) => {
      // ;['>', '>=', '<', '<=', '=']
      switch (operator.length && operator.join('')) {
        case '>':
          return epochSelectedDate > epochConditionalDate
        case '>=':
          return epochSelectedDate >= epochConditionalDate
        case '<':
          return epochSelectedDate < epochConditionalDate
        case '<=':
          return epochSelectedDate <= epochConditionalDate
        case '=':
          return epochSelectedDate === epochConditionalDate
        default:
          return false
      }
    }
    return isDateEligible(operator, epochSelectedDate, epochConditionalDate)
  }

  // collect all the criteria keys and selected criteria values into an array
  const selectedCriteria =
    stepDataArray &&
    stepDataArray
      .map((item, i) =>
        item.section.fieldsets.map(item => {
          // // TODO: exludes groups for now
          // if (item.fieldset.fieldsets) {
          //   return undefined
          // }

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
      data.map((item, i) => {
        // find all eligibility items that are matches to criteria key
        selectedCriteria.forEach(selected => {
          // match item to criteria key
          const criteriaEligibility = item.benefit.eligibility.find(
            criteria => criteria.criteriaKey === selected.criteriaKey
          )

          // determine it's eligiblity
          if (criteriaEligibility !== undefined) {
            // look for eligible matches
            const isEligible = () => {
              let eligibility

              if (typeof selected.values.value === 'object') {
                eligibility = criteriaEligibility.acceptableValues.find(value =>
                  handleDateEligibility(value, selected.values.value)
                )
              } else {
                eligibility = criteriaEligibility.acceptableValues.find(
                  value => value === selected.values.value
                )
              }
              return eligibility
            }

            // undefined === false
            criteriaEligibility.isEligible = !!isEligible()
          }
        })
        return item
      })
    // merge all arrays and objects into one array
    const mergedEligibleItems = eligibleItems && [].concat(...eligibleItems)
    return mergedEligibleItems
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data, selectedCriteria])

  // compare the selected criteria array with benefits
  return (
    <div className="result-view">
      <Chevron
        heading={
          notQualifiedView
            ? notQualified.chevron.heading
            : qualified.chevron.heading
        }
        description={
          notQualifiedView
            ? notQualified.chevron.description
            : qualified.chevron.description
        }
      />
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
            data={handleData(selectedCriteria, data)}
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
            <Button onClick={() => setNotQualifiedView(true)}>
              {notEligibleResults?.cta}
            </Button>
          </div>
        )}
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
