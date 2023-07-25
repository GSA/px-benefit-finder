import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  Alert,
  Button,
  Heading,
  KeyElegibilityCrieriaList,
  ObfuscatedLink,
  Paragraph,
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
const BenefitAccordionGroup = ({ data, entryKey, expandAll }) => {
  /**
   * a hook that hanldes our open state of the accordions in our group
   * @function
   * @return {boolean} returns true or false
   */
  const [isExpandAll, setExpandAll] = useState(false)

  /**
   * a function that returns the string value of our expanded action
   * @function
   * @return {stroing} returns label for our button
   */
  const handleExpandIcon = isExpandAll ? 'Collapse all -' : 'Expand all +'

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
        <div className="unmet-criteria-title">UNMET CRITERIA</div>
        <ul className="unmet-criteria-list">
          {items.map((item, index) => {
            const { label } = item
            return (
              <li key={index} className="unmet-criteria-item">
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
      {data &&
        data.map((item, index) => {
          const {
            agency,
            eligibility,
            initialEligibilityLength,
            sourceLink,
            summary,
            title,
          } = item[entryKey]
          // filter to get benefit criteria matches
          const eligibleBenefits = eligibility.filter(
            item => item.isEligible === true
          )
          // filter to get unmet criteria
          const notEligibleBenefits = eligibility.filter(
            item => !item.isEligible
          )
          // determine the eligibility statues based on the benefits length
          const eligibleStatus =
            eligibleBenefits.length === initialEligibilityLength
              ? 'Likely Eligible'
              : eligibleBenefits.length > 0 &&
                eligibleBenefits.length < initialEligibilityLength
              ? 'Potentially  Eligible'
              : 'Not Eligible'

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
            >
              <Heading className="benefit-detail-title" headingLevel={4}>
                {`Provided by ${agency.title}`}
              </Heading>
              <Paragraph className="benefit-detail-summary">
                {summary}
              </Paragraph>
              <KeyElegibilityCrieriaList
                className="benefit-criteria-list"
                data={eligibleBenefits}
                initialEligibilityLength={initialEligibilityLength}
              />
              <NotEligibleList items={notEligibleBenefits} />
              <Alert className="benefit-alert">
                Additional eligibility criteria may apply. Please visit agency
                for full requirements.
              </Alert>
              <ObfuscatedLink className="benefit-link" href={sourceLink}>
                Visit {agency.title}
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
