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

  return (
    <div className="benefit-accordion-group">
      {expandAll && (
        <Button
          className="expand-all"
          unstyled
          onClick={() => setExpandAll(!isExpandAll)}
        >
          {handleExpandIcon}
        </Button>
      )}
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
          // put into state initial elegibility length
          const eligibleStatus =
            eligibility.length === initialEligibilityLength
              ? 'Likely Eligible'
              : eligibility.length > 0 &&
                eligibility.length < initialEligibilityLength
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
                data={eligibility}
                initialEligibilityLength={initialEligibilityLength}
              />
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
