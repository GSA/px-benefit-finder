import { Heading } from '../index'
import PropTypes from 'prop-types'
import './_index.scss'

const KeyElegibilityCrieriaList = ({ data, initialElegibilityLength }) => {
  return (
    <div className="key-eligibility-criteria-group">
      {data && (
        <>
          {' '}
          <Heading
            className="key-eligibility-criteria-heading"
            headingLevel={5}
          >
            {`Key Eligibility Criteria Meet ${data.length} of
            ${initialElegibilityLength}`}
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
  props: PropTypes.any,
}

export default KeyElegibilityCrieriaList
