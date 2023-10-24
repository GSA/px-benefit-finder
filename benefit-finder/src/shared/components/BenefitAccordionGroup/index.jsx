import { useState } from 'react'
import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'
import {
  Accordion,
  Alert,
  Button,
  Heading,
  KeyElegibilityCrieriaList,
  ObfuscatedLink,
} from '../index'
import './_index.scss'

/**
 * a functional compound component that renders a benefit group accordion
 * @component
 * @param {array} data - our benefits data
 * @param {string} entryKey - which key in the array to target
 * @param {bool} expandAll - determnines if we include ExpandAll component
 * @return {html} returns html
 */
const BenefitAccordionGroup = ({
  data,
  entryKey,
  expandAll,
  notQualifiedView,
  ui,
}) => {
  const { benefitAccordion, benefitAccordionGroup } = ui
  const {
    eligibleStatusLabels,
    agencyPrefix,
    visitLabel,
    unmetLabel,
    additionalDescription,
  } = benefitAccordion
  const { closedState, openState } = benefitAccordionGroup
  /**
   * a hook that hanldes our open state of the accordions in our group
   * @function
   * @return {boolean} returns true or false
   */
  const [isExpandAll, setExpandAll] = useState(false)
  // const [filterData, setFilterData] = useState(null)

  /**
   * a function that returns the string value of our expanded action
   * @function
   * @return {stroing} returns label for our button
   */
  const handleExpandIcon = isExpandAll ? `${openState} -` : `${closedState} +`

  /**
   * a functional component that renders a button and controls the expansion of our accordions
   * @component
   * @return {html} returns html
   */
  const ExpandAll = () => {
    return (
      expandAll && (
        <Button
          className="expand-all"
          aria-label={handleExpandIcon}
          unstyled
          onClick={() => setExpandAll(!isExpandAll)}
        >
          {handleExpandIcon}
        </Button>
      )
    )
  }

  /**
   * a functional component that list unmet criteria
   * @component
   * @param {array} item - an array of unmet criteria
   * @return {html} returns an unorderd list
   */
  const NotEligibleList = ({ items }) => {
    return (
      <div className="unmet-criteria-group">
        <div className="unmet-criteria-title">{unmetLabel}</div>
        <ul className="unmet-criteria-list">
          {items.map((item, index) => {
            const { label } = item
            return (
              <li
                key={`not-eligible-list-${index}`}
                className="unmet-criteria-item"
              >
                {label}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  /**
   * a functional component that list unmet criteria
   * @component
   * @param {array} item - an array of unmet criteria
   * @return {html} returns an unorderd list
   */
  const MoreInfoList = ({ items }) => {
    return (
      <div className="unmet-criteria-group">
        <div className="unmet-criteria-title">{eligibleStatusLabels[1]}</div>
        <ul className="unmet-criteria-list">
          {items.map((item, index) => {
            const { label } = item
            return (
              <li key={`more-info-${index}`} className="unmet-criteria-item">
                {label}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="benefit-accordion-group">
      <ExpandAll />
      {console.log(data)}
      {data &&
        data.map((item, index) => {
          const { agency, eligibility, SourceLink, summary, title } =
            item[entryKey]
          // filter to get benefit criteria matches
          const eligibleBenefits = eligibility.filter(
            item => item.isEligible === true
          )
          // filter to get unmet criteria
          const notEligibleBenefits = eligibility.filter(
            item => item.isEligible === false
          )

          // filter to get criteria without user values to compare with
          const moreInformationNeeded = eligibility.filter(
            item => item.isEligible === undefined
          )
          // determine the eligibility statues based on the benefits length
          // Total Criteria = y
          // Met Criteria = x
          // Not Met Criteria = z

          // Criteria Met Length	Label
          // x === y	"Likely Eligible"
          // z === 0 && x === undefined length > 0 "More Information Needed"
          // Criteria Not Met	Label
          // z > 0	"Not Eligible"
          const eligibleStatus =
            eligibleBenefits.length === eligibility.length
              ? eligibleStatusLabels[0]
              : notEligibleBenefits.length === 0 &&
                moreInformationNeeded.length > 0
              ? eligibleStatusLabels[1]
              : eligibleStatusLabels[2]

          const handleHidden =
            notQualifiedView === false &&
            eligibleStatus !== eligibleStatusLabels[0]
              ? true
              : !!(
                  notQualifiedView === true &&
                  eligibleStatus === eligibleStatusLabels[0]
                )

          return (
            <Accordion
              key={`${index}-${title}`}
              id={`${index}-${title}`}
              heading={title}
              subHeading={eligibleStatus}
              aria-expanded={isExpandAll}
              isExpanded={isExpandAll}
              data-analytics="benefit-accordion"
              data-analytics-content={title}
              hidden={handleHidden}
            >
              <Heading className="benefit-detail-title" headingLevel={4}>
                {`${agencyPrefix} ${agency.title}`}
              </Heading>
              <div
                className="benefit-detail-summary"
                dangerouslySetInnerHTML={createMarkup(summary)}
              />
              <KeyElegibilityCrieriaList
                className="benefit-criteria-list"
                data={eligibleBenefits}
                initialEligibilityLength={eligibility.length}
                ui={benefitAccordion}
              />
              {notEligibleBenefits.length > 0 && (
                <NotEligibleList items={notEligibleBenefits} />
              )}
              {moreInformationNeeded.length > 0 && (
                <MoreInfoList items={moreInformationNeeded} />
              )}
              <Alert className="benefit-alert">{additionalDescription}</Alert>
              <ObfuscatedLink
                className="benefit-link"
                href={SourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {visitLabel} {agency.title}
              </ObfuscatedLink>
            </Accordion>
          )
        })}
    </div>
  )
}

BenefitAccordionGroup.propTypes = {
  data: PropTypes.array,
  entryKey: PropTypes.string,
  expandAll: PropTypes.bool,
}

export default BenefitAccordionGroup
