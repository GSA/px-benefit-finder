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

const BenefitAccordionGroup = ({ data, entryKey, expandAll }) => {
  const [isExpandAll, setExpandAll] = useState(false)
  const handleExpandIcon = isExpandAll ? 'Collapse all -' : 'Expand all +'

  const ExpandAll = () => {
    return (
      expandAll && (
        <Button
          className="expand-all"
          unstyled
          onClick={() => setExpandAll(!isExpandAll)}
        >
          {handleExpandIcon}
        </Button>
      )
    )
  }

  const NotEligibleList = ({ items }) => {
    return (
      <div className="benefit-accordion-unmet-criteria-group">
        <div className="benefit-accordion-unmet-criteria-title">
          UNMET CRITERIA
        </div>
        <ul className="benefit-accordion-unmet-criteria-list">
          {items.map((item, index) => {
            const { label } = item
            return (
              <li key={index} className="benefit-accordion-unmet-criteria-item">
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
          // get benefit criteria matches
          const eligibleBenefits = eligibility.filter(
            item => item.eligible === true
          )
          // get not benefit criteria matches
          const notEligibleBenefits = eligibility.filter(item => !item.eligible)
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
              title={title}
              eligibleStatus={eligibleStatus}
              aria-expanded={isExpandAll}
              isExpanded={isExpandAll}
            >
              <Heading
                className="benefit-accordion-detail-title"
                headingLevel={4}
              >
                Provided by {agency.title}
              </Heading>
              <Paragraph className="benefit-accordion-detail-summary">
                {summary}
              </Paragraph>
              <KeyElegibilityCrieriaList
                className="benefit-accordion-criteria-list"
                data={eligibleBenefits}
                initialEligibilityLength={initialEligibilityLength}
              />
              <NotEligibleList items={notEligibleBenefits} />
              <Alert className="benefit-accordion-alert">
                Additional eligibility criteria may apply. Please visit agency
                for full requirements.
              </Alert>
              <ObfuscatedLink
                className="benefit-accordion-link"
                href={sourceLink}
              >
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
