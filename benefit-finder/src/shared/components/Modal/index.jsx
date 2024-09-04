import { useEffect, useRef } from 'react'
import NavModal from 'react-modal'
import PropTypes from 'prop-types'
import { Button, ObfuscatedLink, Icon, Heading } from '../index'
import { scrollLock, dataLayerUtils } from '../../utils'
import { useCrazyEggUpdate } from '../../hooks'

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
    borderColor: '#005ea2',
    padding: '4rem 1.5rem',
    maxWidth: '32.5rem',
  },
}

/**
 * a functional component that renders a trigger, that when clicked opens a dialog
 * @component
 * @param {string} id - matches to modal control
 * @param {React.ReactNode} children - inherited children
 * @param {string} triggerLabel - passed to button for triggering modal
 * @param {string} modalHeading - heading value
 * @param {string} navItemOneLabel - passed to button for nav item in modal
 * @param {string} navItemTwoLabel - passed to button for nav item in modal
 * @param {function} handleCheckRequriedFields - inherited async function to check validity of fields
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
  modalOpen,
  setModalOpen,
  alertElement,
  dataLayerValue,
}) => {
  // state
  const triggerRef = useRef(null)
  const { modal, errors } = dataLayerUtils.dataLayerStructure

  /**
   * a function that triggers the modal to an open state
   * @function
   */
  const handleOpenModal = () => {
    handleCheckRequriedFields().then(valid =>
      valid === true
        ? setModalOpen(true)
        : window.scrollTo(0, 0) && alertElement.current.focus()
    )
  }

  /**
   * a function that triggers the modal to a closed state
   * @function
   * @param {ref} triggerRef - passed to button for triggering modal
   */
  const handleCloseModal = triggerRef => {
    // focus the trigger if it is still in the DOM
    triggerRef && triggerRef.current.focus()
    // clear the hash
    window.location.hash = ''
    scrollLock.disableScroll()
    setModalOpen(false)
    return true
  }

  const handleKeyValidation = e => e.which === 32 || e.which === 13

  useEffect(() => {
    modalOpen && scrollLock.enableScroll()
  }, [modalOpen])

  // effects
  useEffect(() => {
    const cleanUp = () => {
      const root = document.getElementById('benefit-finder')

      root &&
        root.hasAttribute('aria-hidden') &&
        root.removeAttribute('aria-hidden')
    }

    // set our application root id here
    NavModal.setAppElement('#benefit-finder')
    return cleanUp()
  }, [])

  // handle crazyEgg
  modalOpen === true && useCrazyEggUpdate({ pageView: modal.bfData.pageView })

  // handle dataLayer
  useEffect(() => {
    modalOpen === true &&
      dataLayerUtils.dataLayerPush(window, {
        event: modal.event,
        bfData: {
          pageView: modal.bfData.pageView,
          viewTitle: `${dataLayerValue.viewTitle} modal`,
        },
      })
    // handle dataLayer
    modalOpen === true &&
      dataLayerUtils.dataLayerPush(window, {
        event: errors.event,
        bfData: {
          errors: '',
          errorCount: {
            number: 0,
            string: `0`,
          },
          formSuccess: true,
        },
      })
  }, [])

  /**
   * a functional component that renders a link as a button for launching our dialog
   * @component
   * @param {string} id - matches to modal control
   * @param {string} triggerLabel - passed to button for triggering modal
   * @return {html} returns an obfustacted anchor element
   */
  const Trigger = ({ triggerLabel, onKeyDown, onClick }) => {
    return (
      <ObfuscatedLink
        onClick={onClick}
        onKeyDown={onKeyDown}
        noCarrot
        tabIndex="0"
        triggerRef={triggerRef}
        aria-label="Continue"
        role="button"
      >
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
    const handleClick = navFunction => {
      handleCloseModal(triggerRef) && navFunction()
    }
    const handleKeyDown = (e, navFunction) => {
      handleKeyValidation(e) && handleCloseModal(triggerRef) && navFunction()
    }
    return (
      <ul className="bf-modal bf-usa-button-group usa-button-group width-full">
        <li
          className="bf-usa-button-group__item usa-button-group__item width-full"
          key="bf-nav-item-one"
        >
          <Button
            id="bf-navItemOneBtn"
            className="bf-nav-item-one width-full"
            onClick={() => handleClick(navItemOneFunction)}
            onKeyDown={e => handleKeyDown(e, navItemOneFunction)}
            noCarrot
            tabIndex="0"
            secondary
          >
            {navItemOneLabel}
          </Button>
        </li>
        <li
          className="bf-usa-button-group__item usa-button-group__item width-full"
          key="nav-item-two"
        >
          <Button
            id="bf-navItemTwoBtn"
            className="bf-nav-item-two width-full"
            onClick={() => handleClick(navItemTwoFunction)}
            onKeyDown={e => handleKeyDown(e, navItemTwoFunction)}
            noCarrot
            tabIndex="0"
            secondary
          >
            {navItemTwoLabel}
          </Button>
        </li>
      </ul>
    )
  }

  return (
    <div id={id} className="bf-usa-modal-group">
      <Trigger
        triggerLabel={triggerLabel}
        onKeyDown={e => handleKeyValidation(e) && handleOpenModal()}
        onClick={() => handleOpenModal()}
      ></Trigger>
      <NavModal
        id="benefit-finder-modal"
        isOpen={modalOpen}
        onRequestClose={() => handleCloseModal(triggerRef)}
        style={customStyles}
        aria={{
          label: modalHeading,
        }}
      >
        <button
          type="button"
          aria-label="Close"
          className="bf-modal-button"
          onClick={() => handleCloseModal(triggerRef)}
        >
          <Icon type="modal-close" color="black" aria-hidden="true" />
        </button>
        <Heading headingLevel={1} className="bf-modal-heading">
          {modalHeading}
        </Heading>
        {children || (
          <GroupNavigation
            navItemOneLabel={navItemOneLabel}
            navItemOneFunction={navItemOneFunction}
            navItemTwoLabel={navItemTwoLabel}
            navItemTwoFunction={navItemTwoFunction}
          />
        )}
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
  handleCheckRequriedFields: PropTypes.func,
}

export default Modal
