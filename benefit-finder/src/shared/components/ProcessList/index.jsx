import PropTypes from 'prop-types'
import './_index.scss'

const ProcessList = ({ steps }) => {
  return (
    <ol className="usa-process-list">
      {steps &&
        steps.map((step, index) => {
          return (
            <li
              key={`process-item-${index}`}
              className="usa-process-list__item"
            >
              <h3 className="usa-process-list__heading">{step.title}</h3>
            </li>
          )
        })}
    </ol>
  )
}

ProcessList.propTypes = {
  steps: PropTypes.array,
}

export default ProcessList
