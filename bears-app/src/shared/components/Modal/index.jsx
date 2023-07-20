import { useEffect } from 'react'
import modal from '@uswds/uswds/js/usa-modal'
import PropTypes from 'prop-types'
import Close from './assets/close.svg'
import { ObfuscatedLink, Heading } from '../index'
import './_index.scss'

/**
 * a functional component that renders a trigger, that when clicked opens a dialog
 * @component
 * @param {string} id - matches to modal control
 * @param {React.ReactNode} children - inherited children
 * @param {string} triggerLabel - passed to button for triggering modal
 * @param {string} modalHeading - heading value
 * @param {string} navItemOneLabel - passed to button for nav item in modal
 * @param {string} navItemTwoLabel - passed to button for nav item in modal
 * @return {html} returns html for seting up a usa-modal component
 */
const Modal = ({
  id,
  children,
  triggerLabel,
  modalHeading,
  navItemOneLabel,
  navItemTwoLabel,
}) => {
  useEffect(() => {
    // initialize
    modal.on()

    // remove event listeners when the component un-mounts.
    return () => {
      modal.off()
    }
  })

  /**
   * a functional component that renders a link as a button for launching our dialog
   * @component
   * @param {string} id - matches to modal control
   * @param {string} triggerLabel - passed to button for triggering modal
   * @return {html} returns an obfustacted anchor element
   */
  const Trigger = ({ id, triggerLabel }) => {
    return (
      <ObfuscatedLink
        href={`#${id}`}
        aria-controls={id}
        data-open-modal
        noCarrot
      >
        {triggerLabel}
      </ObfuscatedLink>
    )
  }

  /**
   * a functional component that renders a two links as a buttons for navigating out of the dialog
   * @component
   * @param {string} navItemOneLabel - passed to button for nav item in modal
   * @param {string} navItemTwoLabel - passed to button for nav item in modal
   * @return {html} returns an obfustacted anchor element
   */
  // similar to ButtonGroup but we need links for uswds to close modal, this item is default and conditional
  const GroupNavigation = ({ navItemOneLabel, navItemTwoLabel }) => {
    return (
      <ul className="usa-button-group width-full">
        <li className="usa-button-group__item width-full">
          <ObfuscatedLink
            className="nav-item-one width-full"
            data-close-modal
            noCarrot
          >
            {navItemOneLabel}
          </ObfuscatedLink>
        </li>
        <li className="usa-button-group__item width-full">
          <ObfuscatedLink
            className="nav-item-two width-full"
            data-close-modal
            noCarrot
          >
            {navItemTwoLabel}
          </ObfuscatedLink>
        </li>
      </ul>
    )
  }

  return (
    <div className="benefit-modal-group">
      <Trigger id={id} triggerLabel={triggerLabel}></Trigger>
      <div
        className="usa-modal"
        id={id}
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
      >
        <div className="usa-modal__content">
          <div className="usa-modal__main">
            <Heading headingLevel={2} id="modal-heading">
              {modalHeading}
            </Heading>
            <div className="usa-modal__footer">
              {children || (
                <GroupNavigation
                  navItemOneLabel={navItemOneLabel}
                  navItemTwoLabel={navItemTwoLabel}
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
  id: PropTypes.string,
  children: PropTypes.node,
  triggerLabel: PropTypes.string,
  modalHeading: PropTypes.string,
  navItemOneLabel: PropTypes.string,
  navItemTwoLabel: PropTypes.string,
}

export default Modal
