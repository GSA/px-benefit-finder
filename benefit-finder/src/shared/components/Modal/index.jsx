import { useEffect, useState } from 'react'
import NavModal from 'react-modal'
import PropTypes from 'prop-types'
import { ObfuscatedLink } from '../index'

import './_index.scss'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    borderRadius: '8px',
    padding: '64px 24px',
    maxWidth: '520px',
  },
}

const Close = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

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
  navItemOneFunction,
  navItemTwoLabel,
  navItemTwoFunction,
  handleCheckRequriedFields,
}) => {
  // state
  const [modalIsOpen, setIsOpen] = useState(false)

  // handlers
  /**
   * a function that checks for errors and then triggers the modal to open state
   * @function
   */
  const handleOpenModal = () => {
    handleCheckRequriedFields() === true && setIsOpen(true)
  }

  /**
   * a function that triggers the modal to a closed state
   * @function
   */
  const handleCloseModal = () => {
    // clear the hash
    window.location.hash = ''
    setIsOpen(false)
  }

  // effects
  useEffect(() => {
    // set our application root id here
    NavModal.setAppElement('#benefit-finder')
  }, [])

  /**
   * a functional component that renders a link as a button for launching our dialog
   * @component
   * @param {string} id - matches to modal control
   * @param {string} triggerLabel - passed to button for triggering modal
   * @return {html} returns an obfustacted anchor element
   */
  const Trigger = ({ triggerLabel, onClick }) => {
    return (
      <ObfuscatedLink onClick={onClick} noCarrot>
        {triggerLabel}
      </ObfuscatedLink>
    )
  }

  /**
   * a functional component that renders a two links as a buttons for navigating out of the dialog
   * @component
   * @param {string} navItemOneLabel - passed to button for nav item in modal
   * @param {func} navItemOneFunction - passed to button for nav item in modal
   * @param {string} navItemOneLabel - passed to button for nav item in modal
   * @param {func} navItemTwoFunction - passed to button for nav item in modal
   * @return {html} returns an obfustacted anchor element
   */
  // similar to ButtonGroup but we need links for uswds to close modal, this item is default and conditional
  const GroupNavigation = ({
    navItemOneLabel,
    navItemOneFunction,
    navItemTwoLabel,
    navItemTwoFunction,
  }) => {
    return (
      <ul className="modal usa-button-group width-full">
        <li className="usa-button-group__item width-full" key="nav-item-one">
          <ObfuscatedLink
            id="navItemOneBtn"
            className="nav-item-one width-full"
            onClick={() => navItemOneFunction()}
            noCarrot
          >
            {navItemOneLabel}
          </ObfuscatedLink>
        </li>
        <li className="usa-button-group__item width-full" key="nav-item-two">
          <ObfuscatedLink
            id="navItemTwoBtn"
            className="nav-item-two width-full"
            onClick={() => navItemTwoFunction()}
            noCarrot
          >
            {navItemTwoLabel}
          </ObfuscatedLink>
        </li>
      </ul>
    )
  }

  return (
    <div id={id} className="benefit-modal-group">
      <Trigger
        triggerLabel={triggerLabel}
        onClick={() => handleOpenModal()}
      ></Trigger>
      <NavModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <button
          type="button"
          className="modal-button"
          onClick={() => handleCloseModal()}
        >
          <Close alt="a close out icon" />
        </button>
        <div className="modal-heading">{modalHeading}</div>
        {children || (
          <GroupNavigation
            navItemOneLabel={navItemOneLabel}
            navItemOneFunction={navItemOneFunction}
            navItemTwoLabel={navItemTwoLabel}
            navItemTwoFunction={navItemTwoFunction}
          />
        )}
        {/* child example: <ul className="usa-button-group">
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
      </NavModal>
    </div>
  )
}

Modal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  triggerLabel: PropTypes.string,
  modalHeading: PropTypes.string,
  navItemOneLabel: PropTypes.string,
  navItemOneFunction: PropTypes.func,
  navItemTwoLabel: PropTypes.string,
  navItemTwoFunction: PropTypes.func,
}

export default Modal
