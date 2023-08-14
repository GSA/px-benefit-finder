import PropTypes from 'prop-types'
import { Heading, Button } from '../index'

/**
 * afunctional component that renders a view of the form input state values
 * @component
 * @param {function} handleStepForward - an array of sections
 * @param {function} handleStepBack - determinate to render headings or not
 * @param {object} ui - translations
 * @param {array} data - inherited state of data in current session
 * @return {html} returns semantic html view for current input values
 */
const VerifySelectionsView = ({
  handleStepForward,
  handleStepBack,
  ui,
  data,
}) => {
  const { heading, buttonGroup } = ui
  return (
    <div>
      <Heading headingLevel={2}>{heading}</Heading>
      {data &&
        data.map((item, i) => {
          // get the sectional data
          // map all the criteria input legends and values
          const { section } = item
          return (
            <div key={i}>
              <Heading headingLevel={4} key={`section-${i}`}>
                {section.heading}
              </Heading>
              <div>
                {section.fieldsets.map((item, i) => {
                  const criteriaId = `criteria-${item.fieldset.criteriaKey}-${i}`
                  const result =
                    item.fieldset.inputs[0].inputCriteria.values.find(
                      value => value.selected
                    )

                  // formate if date object
                  const parseDate = value => {
                    const d = new window.Date(
                      Date.UTC(value.year, value.month, value.day)
                    )
                    return d
                  }

                  const dateFormatOptions = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }

                  // if no value then return generic message
                  return result !== undefined ? (
                    <div>
                      <Heading headingLevel={5} key={`${criteriaId}`}>
                        {item.fieldset.legend}
                      </Heading>
                      {typeof result.value === 'object'
                        ? `${parseDate(result.value).toLocaleDateString(
                            undefined,
                            dateFormatOptions
                          )}`
                        : result.value}
                    </div>
                  ) : (
                    <div>
                      <Heading headingLevel={5} key={`${criteriaId}`}>
                        {item.fieldset.legend}
                      </Heading>
                      No input given.
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      <Button onClick={handleStepBack}>{buttonGroup[0].value}</Button>
      <Button onClick={handleStepForward}>{buttonGroup[1].value}</Button>
    </div>
  )
}

VerifySelectionsView.propTypes = {
  handleStepForward: PropTypes.func,
  handleStepBck: PropTypes.func,
  ui: PropTypes.object,
  data: PropTypes.array,
}

export default VerifySelectionsView
