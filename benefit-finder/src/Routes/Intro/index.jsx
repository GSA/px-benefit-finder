import { useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { RouteContext } from '@/App'
import { dataLayerUtils } from '@utils'
import { useResetElement } from '@hooks'
import PropTypes from 'prop-types'
import {
  Button,
  Chevron,
  Heading,
  NoticesList,
  ProcessList,
  TimeIndicator,
} from '@components'

import './_index.scss'

/**
 * a compound component that renders the introductional start of the form process
 * @component
 * @param {object} content - inherited life event content
 * @param {object} ui - life event form ui translations
 * @return {html} returns information page view if data exist
 */
const Intro = ({ content, ui, hasQueryParams }) => {
  const { timeEstimate, title, summary } = content
  const { heading, timeIndicator, steps, notices, button } = ui
  const { intro } = dataLayerUtils.dataLayerStructure
  const resetElement = useResetElement()
  const ROUTES = useContext(RouteContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleStep = () => {
    navigate(`/${ROUTES.indexPath}/${ROUTES.formPaths[0]}`)
    resetElement.current.focus()
  }

  // if we have query paramters direct user to the results page
  useEffect(() => {
    hasQueryParams &&
      navigate(
        `/${ROUTES.indexPath}/${ROUTES.resultsPaths.resultsPath}${location.search}`
      )
  }, [hasQueryParams])

  // handle dataLayer
  useEffect(() => {
    // gtm
    !hasQueryParams &&
      dataLayerUtils.dataLayerPush(window, {
        event: intro.event,
        bfData: { pageView: intro.bfData.pageView, viewTitle: title },
      })
  }, [hasQueryParams])

  return (
    content && (
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
            <Button secondary onClick={() => handleStep()}>
              {button}
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

Intro.propTypes = {
  data: PropTypes.object,
  ui: PropTypes.object,
  step: PropTypes.number,
}

export default Intro
