import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Button } from '../index'

import './_index.scss'

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
  const { stepIndicator, verifySelectionsView, buttonGroup } = ui

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="verify-selections-view">
      <Heading className="section-heading" headingLevel={1}>
        {verifySelectionsView?.heading}
      </Heading>
      <div className="section-wrapper">
        <div className="section">
          <Button className="step-back-link" onClick={handleStepBack} unstyled>
            {stepIndicator?.stepBackLink}
          </Button>
          <div>
            {data &&
              data.map((item, i) => {
                // get the sectional data
                // map all the criteria input legends and values
                const { section } = item
                return (
                  <div className="verify-criteria-section" key={i}>
                    <Heading
                      className="verify-criteria-section-heading"
                      headingLevel={2}
                      key={`section-${i}`}
                    >
                      {section.heading}
                    </Heading>
                    <div>
                      {section.fieldsets.map((item, i) => {
                        // // TODO: exludes groups for now
                        // if (item.fieldset.fieldsets) {
                        //   return null
                        // }
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
                          <div className="verify-criteria-value">
                            <div
                              className="verify-criteria-legend"
                              key={`${criteriaId}`}
                            >
                              {`${item.fieldset.legend}:`}
                            </div>
                            {typeof result.value === 'object'
                              ? `${parseDate(result.value).toLocaleDateString(
                                  undefined,
                                  dateFormatOptions
                                )}`
                              : result.value}
                          </div>
                        ) : (
                          <div className="verify-criteria-value">
                            <div
                              className="verify-criteria-legend"
                              key={`${criteriaId}`}
                            >
                              {`${item.fieldset.legend}:`}
                            </div>
                            No input given.
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
          </div>
          <Button secondary onClick={handleStepBack}>
            {buttonGroup[0].value}
          </Button>
          <Button onClick={handleStepForward}>{buttonGroup[1].value}</Button>
        </div>
      </div>
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
