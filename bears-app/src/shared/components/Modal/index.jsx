import { useEffect } from 'react'
import modal from '@uswds/uswds/js/usa-modal'
import PropTypes from 'prop-types'
import Close from './assets/close.svg'
import { ObfuscatedLink } from '../index'
import './_index.scss'

const Modal = ({ id, children, trigger, heading, navItemOne, navItemTwo }) => {
  useEffect(() => {
    // initialize
    modal.on()

    // remove event listeners when the component un-mounts.
    return () => {
      modal.off()
    }
  })

  const Trigger = ({ id, trigger }) => {
    return (
      <ObfuscatedLink
        href={`#${id}`}
        aria-controls={id}
        data-open-modal
        noCarrot
      >
        {trigger}
      </ObfuscatedLink>
    )
  }

  const GroupNavigation = ({ navItemOne, navItemTwo }) => {
    return (
      <ul className="usa-button-group">
        <li className="usa-button-group__item">
          <ObfuscatedLink className="nav-item-one" data-close-modal noCarrot>
            {navItemOne}
          </ObfuscatedLink>
        </li>
        <li className="usa-button-group__item">
          <ObfuscatedLink className="nav-item-two" data-close-modal noCarrot>
            {navItemTwo}
          </ObfuscatedLink>
        </li>
      </ul>
    )
  }

  return (
    <div className="bears-modal-group">
      <Trigger id={id} trigger={trigger}></Trigger>
      <div
        className="usa-modal"
        id={id}
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
      >
        <div className="usa-modal__content">
          <div className="usa-modal__main">
            <h2 className="usa-modal__heading" id="modal-heading">
              {heading}
            </h2>
            <div className="usa-modal__footer">
              {children || (
                <GroupNavigation
                  navItemOne={navItemOne}
                  navItemTwo={navItemTwo}
                />
              )}
              {/* example: <ul className="usa-button-group">
                <li className="usa-button-group__item">
                  <button type="button" className="usa-button" data-close-modal>
                    Continue without saving
                  </button>
                </li>
                <li className="usa-button-group__item">
                  <button
                    type="button"
                    className="usa-button padding-105 text-center"
                    data-close-modal
                  >
                    Go back
                  </button>
                </li>
              </ul> */}
            </div>
          </div>
          <button
            type="button"
            className="usa-button usa-modal__close"
            aria-label="Close this window"
            data-close-modal
          >
            <img src={Close} alt="a plus icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  trigger: PropTypes.string,
  heading: PropTypes.string,
}

export default Modal
