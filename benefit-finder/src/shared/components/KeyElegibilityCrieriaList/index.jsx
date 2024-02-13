import { Heading } from '../index'
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

  const GreenCheck = () => (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bf-checkmark--green"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4.15417C23.9925 4.52794 23.8515 4.88618 23.6033 5.16208L12.2975 16.6522L10.1157 18.8696C9.84423 19.1219 9.49174 19.2651 9.12397 19.2727C8.7562 19.2651 8.40371 19.1219 8.13223 18.8696L5.95041 16.6522L0.396694 11.0079C0.148478 10.732 0.00748054 10.3738 0 10C0.00748054 9.62626 0.148478 9.26802 0.396694 8.99212L2.57851 6.77473C2.84999 6.52246 3.20248 6.37917 3.57025 6.37156C3.93802 6.37917 4.29051 6.52246 4.56198 6.77473L9.12397 11.4111L19.2397 1.13046C19.5111 0.878193 19.8636 0.734897 20.2314 0.727295C20.5992 0.734897 20.9517 0.878193 21.2231 1.13046L23.405 3.34785C23.8017 3.54943 24 3.75101 24 4.15417Z"
        fill="#009831"
      />
    </svg>
  )

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
                    <GreenCheck />
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
