import { useState } from 'react'
import Close from './assets/close.svg'
import Open from './assets/open.svg'
import PropTypes from 'prop-types'
import './_index.scss'

const Accordion = ({ id, title, description, children }) => {
  const [isOpen, setOpen] = useState(false)
  const handleIcon = () =>
    !isOpen ? (
      <img src={Open} alt="alt text" />
    ) : (
      <img src={Close} alt="alt text" />
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
  props: PropTypes.any,
}

export default Accordion
