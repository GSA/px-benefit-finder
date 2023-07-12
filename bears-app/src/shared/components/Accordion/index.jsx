import { useState } from 'react'
import Close from './assets/close.svg'
import Open from './assets/open.svg'
import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders a usa accordion
 * @component
 * @param {string} id - inherited id
 * @param {string} title - title value
 * @param {string} discription - description value
 * @param {React.ReactNode} children - inherited children
 * @return {html} returns a semantic html button element
 */
const Accordion = ({ id, title, description, children }) => {
  /**
   * a hook that hanldes our open state of the accordion
   * @function
   * @return {boolean} returns true or false
   */
  const [isOpen, setOpen] = useState(false)

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
    <div className="bears-accordion">
      <h4 className="usa-accordion__heading">
        <button
          type="button"
          className="usa-accordion__button"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="title">{title}</span>
          <br />
          <span className="title-description">{description}</span>
          {handleIcon()}
        </button>
      </h4>
      <div
        id={id}
        className="usa-accordion__content usa-prose"
        hidden={!isOpen}
      >
        <p>{children}</p>
      </div>
    </div>
  )
}

Accordion.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default Accordion
