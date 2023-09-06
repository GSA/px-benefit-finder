import { useEffect, useState } from 'react'
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
  /**
   * a hook that hanldes our open state of the accordion
   * @function
   * @return {boolean} returns true or false
   */
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setOpen(isExpanded)
  }, [isExpanded])

  const Close = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" fill="#ffffff" />
    </svg>
  )

  const Open = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="#1a4480" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  )

  /**
   * a handler that returns the proper icon
   * @function
   * @param {React.ReactNode} children - inherited children
   * @return {html} returns a semantic img element with proper svg
   */
  const handleIcon = () =>
    !isOpen ? <Open alt="a plus icon" /> : <Close alt="a minus icon" />

  return (
    <div className="benefit-accordion" {...props} hidden={hidden}>
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
