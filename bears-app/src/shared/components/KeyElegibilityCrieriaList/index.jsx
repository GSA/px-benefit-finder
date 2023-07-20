import { Heading } from '../index'
import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks/useHandleClassName'
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
}) => {
  const defaultClasses = ['key-eligibility-criteria-group']

  return (
    <div className={useHandleClassName({ className, defaultClasses })}>
      {data && (
        <>
          {' '}
          <Heading
            className="key-eligibility-criteria-heading"
            headingLevel={5}
          >
            {`Key Eligibility Criteria Meet ${data.length} of
            ${initialEligibilityLength}`}
          </Heading>
          <ul className="key-eligibility-criteria-list">
            {data.map((item, index) => {
              const { criteriaKey, label } = item
              return (
                <li
                  key={`${index}-${criteriaKey}`}
                  className="usa-list usa-list--unstyled key-eligibility-criteria-list-item"
                >
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
