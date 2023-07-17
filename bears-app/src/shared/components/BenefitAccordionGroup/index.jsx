import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  Alert,
  Button,
  Heading,
  ObfuscatedLink,
  Paragraph,
} from '../index'
import './_index.scss'

const BenefitAccordionGroup = ({ data, entryKey, expandAll }) => {
  const [isExpandAll, setExpandAll] = useState(false)

  return (
    <div className="benefit-accordion-group">
      {expandAll && (
        <Button
          className="expand-all"
          unstyled
          onClick={() => setExpandAll(!isExpandAll)}
        >
          Expand all +
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
              <Heading headingLevel={4}>Provided by {agency.title}</Heading>
              <Paragraph>{summary}</Paragraph>
              <Alert>
                Additional eligibility criteria may apply. Please visit agency
                for full requirements.
              </Alert>
              <ObfuscatedLink href={sourceLink}>
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
