import { Heading, Icon } from '../index'
import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks'
import './_index.scss'

/**
 * a functional component that renders a link as a button
 * @component
 * @param {string} className - inherited class names
 * @param {array} data - contains our criteria
 * @param {string} initialEligibilityLength - location
 * @return {html} returns a group with a heading and an unorderd list
 */
const KeyElegibilityCrieriaList = ({
  className,
  data,
  initialEligibilityLength,
  ui,
}) => {
  const { benefitSummary, benefitSummaryPrefix, benefitSummaryConjunction } = ui
  const defaultClasses = ['bf-key-eligibility-criteria-group']

  return (
    <div className={useHandleClassName({ className, defaultClasses })}>
      {data && (
        <>
          {' '}
          <Heading
            className="bf-key-eligibility-criteria-heading"
            headingLevel={5}
          >
            {`${benefitSummary}`}
            <p className="bf-key-eligibility-criteria-sub-heading">{`${benefitSummaryPrefix} ${data.length} ${benefitSummaryConjunction}
            ${initialEligibilityLength}`}</p>
          </Heading>
          <ul className="bf-key-eligibility-criteria-list">
            {data.map((item, index) => {
              const { criteriaKey, label } = item
              return (
                <li
                  key={`${criteriaKey}-${index}`}
                  className="bf-usa-list usa-list usa-list--unstyled  bf-usa-list--unstyled bf-key-eligibility-criteria-list-item"
                  data-testid={`${criteriaKey}`}
                >
                  <div aria-hidden="true">
                    <Icon type="green-check" />
                  </div>
                  {label}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

KeyElegibilityCrieriaList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  initialEligibilityLength: PropTypes.number,
}

export default KeyElegibilityCrieriaList
