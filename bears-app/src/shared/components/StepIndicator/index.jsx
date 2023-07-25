import { useState } from 'react'
import { StepBackLink } from '../index'
import PropTypes from 'prop-types'

/**
 * a functional component that renders a step indicator for our form sections
 * @component
 * @param {array} data - an array of sections
 * @param {boolean} noHeadings - determinate to render headings or not
 * @return {html} returns markup for a usa step indicator
 */
const StepIndicator = ({ data, noHeadings }) => {
  /**
   * a function that manages which of our step links is the current one
   * @function
   * @param {number} current - an array of sections
   * @param {function} setCurrent - update integer value
   * @return {number} returns current step
   */
  const [current, setCurrent] = useState(0)

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
   * @param {number} index - the index of this item
   * @param {boolean} completed - state of completion
   * @return {html} returns markup for a usa step indicator segment
   */
  const StepIndicatorSegment = ({
    heading,
    current,
    setCurrent,
    completed,
    index,
  }) => {
    const statusClass = current === index ? '--current' : ''
    return (
      <li
        className={`usa-step-indicator__segment usa-step-indicator__segment${statusClass}`}
        aria-current={completed}
        onClick={() => setCurrent(index)}
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
                />
              )
            })}
        </ol>
      </div>
      <StepBackLink currentIndex={current} setCurrent={setCurrent} />
    </div>
  )
}

StepIndicator.propTypes = {
  data: PropTypes.array,
  noHeadings: PropTypes.bool,
}

export default StepIndicator
