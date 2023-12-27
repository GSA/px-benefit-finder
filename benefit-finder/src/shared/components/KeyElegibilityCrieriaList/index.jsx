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
  ui,
}) => {
  const { benefitSummary, benefitSummaryPrefix, benefitSummaryConjunction } = ui
  const defaultClasses = ['key-eligibility-criteria-group']

  /**
   * a functional component that renders an svg image
   * @component
   * @return {html} returns a semantic svg element
   */
  const Check = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
    >
      <path
        // eslint-disable-next-line react/no-unknown-property
        fill-rule="evenodd"
        // eslint-disable-next-line react/no-unknown-property
        clip-rule="evenodd"
        aria-hidden="true"
        d="M24.5 4.15417C24.4925 4.52794 24.3515 4.88618 24.1033 5.16208L12.7975 16.6522L10.6157 18.8696C10.3442 19.1219 9.99174 19.2651 9.62397 19.2727C9.2562 19.2651 8.90371 19.1219 8.63223 18.8696L6.45041 16.6522L0.896694 11.0079C0.648478 10.732 0.507481 10.3738 0.5 10C0.507481 9.62626 0.648478 9.26802 0.896694 8.99212L3.07851 6.77473C3.34999 6.52246 3.70248 6.37917 4.07025 6.37156C4.43802 6.37917 4.79051 6.52246 5.06198 6.77473L9.62397 11.4111L19.7397 1.13046C20.0111 0.878193 20.3636 0.734897 20.7314 0.727295C21.0992 0.734897 21.4517 0.878193 21.7231 1.13046L23.905 3.34785C24.3017 3.54943 24.5 3.75101 24.5 4.15417Z"
        fill={color}
      />
    </svg>
  )

  return (
    <div className={useHandleClassName({ className, defaultClasses })}>
      {data && (
        <>
          {' '}
          <Heading
            className="key-eligibility-criteria-heading"
            headingLevel={5}
          >
            {`${benefitSummary}`}
            <p className="key-eligibility-criteria-sub-heading">{`${benefitSummaryPrefix} ${data.length} ${benefitSummaryConjunction}
            ${initialEligibilityLength}`}</p>
          </Heading>
          <ul className="key-eligibility-criteria-list">
            {data.map((item, index) => {
              const { criteriaKey, label } = item
              return (
                <li
                  key={`${criteriaKey}-${index}`}
                  className="usa-list usa-list--unstyled key-eligibility-criteria-list-item"
                  data-testid={`${criteriaKey}`}
                >
                  {' '}
                  <Check color="forestgreen" />
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
