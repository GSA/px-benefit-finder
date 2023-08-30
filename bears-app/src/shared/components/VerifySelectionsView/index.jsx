import { useEffect } from 'react'
import PropTypes from 'prop-types'
import parseDate from '../../utils/parseDate'
import * as apiCalls from '../../api/apiCalls'
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
  const local = apiCalls.GET.Language()
  const dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  /**
   * afunctional component that renders markup when no value has been given
   * @component
   * @param {object} item - fieldset object with no selected value
   * @param {number} index - current index of mapped array
   * @return {html} returns html div
   */
  const NoInputGiven = ({ item, index }) => (
    <div className="verify-criteria-value">
      <div
        className="verify-criteria-legend"
        key={`criteria-${item.fieldset.criteriaKey}-${index}`}
      >
        {item.fieldset.legend}
      </div>
      No input given.
    </div>
  )

  /**
   * a functional component that renders markup for fieldset items with selected values
   * @component
   * @param {string} criteriaId - inherited string value
   * @param {string} legend - inherited string value
   * @param {object} selected - selected fieldset object value
   * @return {html} returns html div
   */
  const resultItem = ({ criteriaId, legend, selected }) => {
    return (
      <div className="verify-criteria-value">
        <div className="verify-criteria-legend" key={criteriaId}>
          {legend}
        </div>
        {typeof selected?.value === 'object'
          ? `${parseDate(selected.value).toLocaleDateString(
              local,
              dateFormatOptions
            )}`
          : selected?.value}
      </div>
    )
  }

  /**
   * a functional component that renders markup for fieldset items in the form
   * @component
   * @param {object} item - fieldset object
   * @param {number} index - current index of mapped array
   * @return {html} returns html div
   */
  const Items = ({ item, index }) => {
    return (
      <div>
        {resultItem({
          criteriaId: `criteria-${item.fieldset.criteriaKey}-${index}`,
          legend: item.fieldset.legend,
          selected: apiCalls.GET.SelectedValue(item),
        })}
        {apiCalls.GET.Children(item).map(childItem =>
          apiCalls.GET.SelectedValue(childItem) ? (
            resultItem({
              criteriaId: childItem.fieldset.criteriaKey,
              legend: childItem.fieldset.legend,
              selected: apiCalls.GET.SelectedValue(childItem),
            })
          ) : (
            <NoInputGiven
              item={childItem}
              key={childItem.fieldset.criteriaKey}
            />
          )
        )}
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="verify-selections-view">
      <div className="grid-container">
        <Heading className="section-heading" headingLevel={1}>
          {verifySelectionsView?.heading}
        </Heading>
        <div className="section-wrapper">
          <div className="section">
            <Button
              className="step-back-link"
              onClick={handleStepBack}
              unstyled
            >
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
                          // if no value then return generic message
                          return apiCalls.GET.SelectedValue(item) ? (
                            <Items item={item} index={i} />
                          ) : (
                            <NoInputGiven item={item} index={i} />
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
