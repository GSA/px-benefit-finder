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
                  return (
                    <>
                      <div key={`criteria-${item.fieldset.criteriaKey}-${i}`}>
                        <Heading headingLevel={5} key={`section-${i}`}>
                          {item.fieldset.legend}
                        </Heading>
                        {item.fieldset.inputs[0].inputCriteria.values.map(
                          (item, i) => {
                            // check for selected values
                            // return that value if avalible
                            // otherwise return a generic value
                            const selectedValue = Object.hasOwn(
                              item,
                              'selected'
                            )
                              ? item.selected === true && (
                                  <div key={`criteria-item${item.id}-${i}`}>
                                    {item.value}
                                  </div>
                                )
                              : i === 0 && (
                                  <div key={`criteria-item${item.id}-${i}`}>
                                    No value given
                                  </div>
                                )
                            return selectedValue
                          }
                        )}
                      </div>
                      {''}
                    </>
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
