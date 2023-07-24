import { useState } from 'react'
import { StepBackLink } from '../index'
import PropTypes from 'prop-types'

const StepIndicator = ({ data, noHeadings }) => {
  const [current, setCurrent] = useState(0)

  const CompletedSR = ({ completed }) => (
    <span className="usa-sr-only">{completed}</span>
  )

  const StepIndicator = ({
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
                <StepIndicator
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
}

export default StepIndicator
