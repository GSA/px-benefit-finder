import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { parseDate, dataLayerUtils } from '@utils'
import { useCrazyEggUpdate } from '@hooks'
import * as apiCalls from '@api/apiCalls'
import { Heading, Button } from '@components'

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
  const { verifySelections } = dataLayerUtils.dataLayerStructure
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
    <div className="bf-verify-criteria-value">
      <div
        className="bf-verify-criteria-legend"
        key={`bf-criteria-${item.fieldset.criteriaKey}-${index}`}
      >
        {item.fieldset.legend}
      </div>
      {verifySelectionsView?.noResultsLabel}
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
      <div className="bf-verify-criteria-value" key={criteriaId}>
        <div className="bf-verify-criteria-legend">{legend}</div>
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

  // handle crazyEgg
  useCrazyEggUpdate({ pageView: verifySelections.bfData.pageView })

  // handle dataLayer
  useEffect(() => {
    dataLayerUtils.dataLayerPush(window, {
      event: verifySelections.event,
      bfData: {
        pageView: verifySelections.bfData.pageView,
        viewTitle: verifySelectionsView?.heading,
      },
    })
  }, [])

  return (
    <div className="bf-verify-selections-view">
      <div className="bf-grid-container grid-container">
        <Heading className="bf-section-heading" headingLevel={1}>
          {verifySelectionsView?.heading}
        </Heading>
        <div className="bf-section-wrapper">
          <div className="bf-section-info">
            <Button
              className="bf-step-back-button"
              onClick={handleStepBack}
              unstyled
            >
              {stepIndicator?.stepBackButton}
            </Button>
            <div>
              {data &&
                data.map((item, i) => {
                  // get the sectional data
                  // map all the criteria input legends and values
                  const { section } = item
                  return (
                    <div
                      className="bf-verify-criteria-section"
                      key={`bf-section-${section.heading}`}
                    >
                      <Heading
                        className="bf-verify-criteria-section-heading"
                        headingLevel={2}
                      >
                        {section.heading}
                      </Heading>
                      <div>
                        {section.fieldsets.map((item, i) => {
                          // if no value then return generic message
                          return apiCalls.GET.SelectedValue(item) ? (
                            <Items
                              item={item}
                              index={i}
                              key={`bf-criteria-item-${i}`}
                            />
                          ) : (
                            <NoInputGiven
                              item={item}
                              index={i}
                              key={`bf-criteria-item-${i}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="bf-section-nav-btn-group">
              <Button outline onClick={handleStepBack}>
                {buttonGroup[0].value}
              </Button>
              <Button secondary onClick={handleStepForward}>
                {buttonGroup[1].value}
              </Button>
            </div>
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
