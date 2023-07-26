import { useEffect, useState } from 'react'
import Close from './assets/close.svg'
import Open from './assets/open.svg'
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
  ...props
}) => {
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
      <img src={Open} alt="a plus icon" />
    ) : (
      <img src={Close} alt="a minus icon" />
    )

  return (
    <div className="benefit-accordion" {...props}>
      {/* we don't use `usa-accordion` class because it is too opinionated about control, this throws an error from the uswds javascript, but does not impact/break functionality */}
      <h4 className="usa-accordion__heading">
        <button
          type="button"
          className="usa-accordion__button"
          aria-expanded={isOpen || false}
          aria-controls={id}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="heading">{heading}</span>
          <br />
          <span className="sub-heading">{subHeading}</span>
          {handleIcon()}
        </button>
      </h4>
      <div
        id={id}
        className="usa-accordion__content usa-prose"
        hidden={!isOpen}
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
