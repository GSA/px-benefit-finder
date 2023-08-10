import { StepBackLink } from '../index'
import PropTypes from 'prop-types'

/**
 * a functional component that renders a step indicator for our form sections
 * @component
 * @param {array} data - an array of sections
 * @param {boolean} noHeadings - determinate to render headings or not
 * @param {number} current - inherited state, indicates index value
 * @param {boolean} setCurrent - inherited function to mangae index value
 * @param {string} backLinkLabel - inherited value for back link value
 * @param {func} handleCheckRequiredFields - inherited handler
 * @return {html} returns markup for a usa step indicator
 */
const StepIndicator = ({
  data,
  noHeadings,
  current,
  setCurrent,
  backLinkLabel,
  handleCheckRequriedFields,
}) => {
  /**
   * a functional component that supports a11y for completed steps
   * @component
   * @param {boolean} completed - assigns if the step has been completed
   * @param {boolean} noHeadings - determinate to render headings or not
   * @return {html} returns markup for a usa step indicator
   */
  const CompletedSR = ({ completed }) => (
    <span className="usa-sr-only">{completed}</span>
  )

  /**
   * a functional component that creates our step in the list
   * @component
   * @param {string} heading - associated with the step link
   * @param {number} current - the current index from state
   * @param {function} setCurrent - updates the current index from onClick
   * @param {boolean} completed - state of completion
   * @param {number} index - the index of this item
   * @return {html} returns markup for a usa step indicator segment
   */
  const StepIndicatorSegment = ({
    heading,
    current,
    setCurrent,
    completed,
    index,
    handleCheckRequriedFields,
  }) => {
    const statusClass = current === index ? '--current' : ''
    return (
      <li
        className={`usa-step-indicator__segment usa-step-indicator__segment${statusClass}`}
        aria-current={completed}
        onClick={() =>
          completed === false &&
          handleCheckRequriedFields() === true &&
          setCurrent(index + 1)
        }
      >
        <span className="usa-step-indicator__segment-label">
          {!noHeadings && heading} <CompletedSR status={completed} />
        </span>
      </li>
    )
  }

  return (
    <div>
      <div className="usa-step-indicator" aria-label="progress">
        <ol className="usa-step-indicator__segments">
          {data &&
            data.map((step, i) => {
              const heading = step.section.heading
              return (
                <StepIndicatorSegment
                  heading={heading}
                  key={`${heading}-${i}`}
                  index={i}
                  current={current}
                  setCurrent={setCurrent}
                  completed={false}
                  handleCheckRequriedFields={handleCheckRequriedFields}
                />
              )
            })}
        </ol>
      </div>
      <StepBackLink currentIndex={current} setCurrent={setCurrent}>
        {backLinkLabel}
      </StepBackLink>
    </div>
  )
}

StepIndicator.propTypes = {
  data: PropTypes.array,
  noHeadings: PropTypes.bool,
  current: PropTypes.number,
  setCurrent: PropTypes.func,
  backLinkLabel: PropTypes.string,
  handleCheckRequiredFields: PropTypes.func,
}

export default StepIndicator
