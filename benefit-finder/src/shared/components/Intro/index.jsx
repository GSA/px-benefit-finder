import { useResetElement } from '../../hooks'
import PropTypes from 'prop-types'
import {
  Button,
  Chevron,
  Heading,
  NoticesList,
  ProcessList,
  TimeIndicator,
} from '../index'

import './_index.scss'

/**
 * a functional component that renders a link as a button
 * @component
 * @param {object} data - inherited life event content
 * @param {object} ui - life event form ui translations
 * @param {function} setStep - incrments step count for initial form entry
 * @param {number} step - indicates which section of the form we are on
 * @return {html} returns information page view if data exist
 */
const Intro = ({ data, ui, setStep, step }) => {
  const { timeEstimate, title, summary } = data
  const { heading, timeIndicator, steps, notices, button } = ui
  // const resetElements = document.querySelectorAll('[tabindex="-1"]')
  const resetElement = useResetElement()

  const handleStep = () => {
    setStep(step + 1)
    resetElement.current.focus()
  }

  return (
    data && (
      <div className="bf-intro">
        <Chevron heading={title} description={summary} />
        <div className="bf-grid-container grid-container">
          <Heading headingLevel={2}>{heading}</Heading>
          <TimeIndicator
            description={timeIndicator}
            timeEstimate={timeEstimate}
          />
          <div className="bf-intro-process-group">
            <div className="bf-intro-process-list">
              <ProcessList steps={steps.list} description={steps.title} />
            </div>
            <div className="bf-line-sperator-wrapper--vertical">
              <div className="bf-line-sperator--vertical" />
            </div>
            <div className="bf-intro-process-notices">
              <Heading
                className="bf-intro-process-notices-heading"
                headingLevel={2}
              >
                {notices.heading}
              </Heading>
              <NoticesList
                className="bf-intro-process-notices-list"
                data={notices.list}
                iconAlt={notices.iconAlt}
              />
            </div>
          </div>
          <div className="bf-line-sperator-wrapper">
            <div className="bf-line-sperator" />
          </div>
          <div className="bf-cta-wrapper">
            <Button onClick={() => handleStep()}>{button}</Button>
          </div>
        </div>
      </div>
    )
  )
}

Intro.propTypes = {
  data: PropTypes.object,
  ui: PropTypes.object,
  setStep: PropTypes.func,
  step: PropTypes.number,
}

export default Intro
