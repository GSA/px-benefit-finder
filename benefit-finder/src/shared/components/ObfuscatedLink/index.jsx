import { useHandleClassName } from '../../hooks'
import { Icon } from '../index'
import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders a link as a button
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} className - inherited class(es)
 * @param {string} href - location
 * @param {rel} string - follow, nofollow
 * @param {target} string - new window etc.
 * @param {ext} boolean - is the link an external link
 * @param {noCarrot} boolean - adds a decorative carrot to the link
 * @return {html} returns a semantic html anchor element
 */
const ObfuscatedLink = ({
  children,
  className,
  href,
  rel,
  target,
  ext,
  noCarrot,
  triggerRef,
  ...props
}) => {
  // set our link as external, will be decorated by uswds css
  const defaultClasses = ext
    ? [
        'bf-usa-button',
        'usa-button',
        'bf-usa-link--external',
        'usa-link--external',
        'bf-obfuscated-link',
      ]
    : ['bf-usa-button', 'usa-button', 'bf-obfuscated-link']

  const handleCarrot =
    noCarrot === true ? null : (
      <Icon type="carrot-small" color="white" aria-hidden="true" />
    )

  return (
    <a
      href={href}
      rel={rel}
      target={target}
      className={useHandleClassName({ className, defaultClasses })}
      ref={triggerRef}
      {...props}
    >
      {children}
      {handleCarrot}
    </a>
  )
}

ObfuscatedLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  ext: PropTypes.bool,
  noCarrot: PropTypes.bool,
}

export default ObfuscatedLink
