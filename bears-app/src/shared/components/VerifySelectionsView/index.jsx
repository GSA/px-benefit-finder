import PropTypes from 'prop-types'
import { Heading, Button } from '../index'

/**
 * afunctional component that renders a view of the form input state values
 * @component
 * @param {function} handleStepForward - an array of sections
 * @param {function} handleStepBack - determinate to render headings or not
 * @param {objecti} ui - inherited state, indicates index value
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
          const { section } = item
          return (
            <div key={i}>
              <Heading headingLevel={3} key={i}>
                {section.heading}
              </Heading>
              <div>
                {section.fieldsets.map((item, i) => {
                  console.log(section)
                  return (
                    <>
                      <div key={i}>
                        {item.fieldset.legend}
                        {console.log(
                          item.fieldset.inputs[0].inputCriteria.values
                        )}
                        {item.fieldset.inputs[0].inputCriteria.values.map(
                          (item, i) => {
                            console.log(item)
                            return (
                              item.selected === true && (
                                <div key={i}>{item.value}</div>
                              )
                            )
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
}

export default VerifySelectionsView
