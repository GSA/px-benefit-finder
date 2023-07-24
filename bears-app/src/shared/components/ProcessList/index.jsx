import PropTypes from 'prop-types'
import './_index.scss'

const ProcessList = ({ steps }) => {
  return (
    <ol className="usa-process-list">
      {steps &&
        steps.map((step, index) => {
          return (
            <li key={index} className="usa-process-list__item">
              <h4 className="usa-process-list__heading">{step.title}</h4>
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
