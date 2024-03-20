import { useEffect, useState } from 'react'
import accordion from '@uswds/uswds/js/usa-accordion'
import { Icon } from '../index'
import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders a usa accordion
 * @component
 * @param {string} id - inherited id
 * @param {string} heading - title value
 * @param {string} subHeading - eligibleStatus value
 * @param {React.ReactNode} children - inherited children
 * @param {bool} isExpanded - sets the open state of an accordion
 * @return {html} returns a semantic html button element
 */
const Accordion = ({
  id,
  heading,
  subHeading,
  children,
  isExpanded,
  hidden,
  ...props
}) => {
  useEffect(() => {
    accordion.on()

    // remove event listeners when the component un-mounts.
    return () => {
      accordion.off()
    }
  })
  /**
   * a hook that hanldes our open state of the accordion
   * @function
   * @return {boolean} returns true or false
   */
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setOpen(isExpanded)
  }, [isExpanded])

  /**
   * a handler that returns the proper icon
   * @function
   * @param {React.ReactNode} children - inherited children
   * @return {html} returns a semantic img element with proper svg
   */
  const handleIcon = () =>
    !isOpen ? (
      <Icon type="open" alt="a plus icon" />
    ) : (
      <Icon type="close" alt="a minus icon" />
    )

  return (
    <div className="bf-usa-accordion usa-accordion" {...props} hidden={hidden}>
      <h4 className="bf-usa-accordion__heading usa-accordion__heading">
        <button
          type="button"
          className="bf-usa-accordion__button usa-accordion__button"
          aria-expanded={isOpen || false}
          aria-controls={id}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="bf-accordion-heading">{heading}</span>
          <br />
          <span className="bf-accordion-sub-heading">{subHeading}</span>
          {handleIcon()}
        </button>
      </h4>
      <div
        id={id}
        className="bf-usa-accordion__content usa-accordion__content usa-prose"
        hidden={isOpen || true}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}

Accordion.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default Accordion
