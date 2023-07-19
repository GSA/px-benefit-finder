import { useHandleClassName } from '../../hooks/useHandleClassName'
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
 * @param {noCarrot} boolean - is the link an external link
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
  ...props
}) => {
  const defaultClasses = ext
    ? [
        'usa-button',
        'usa-link--external',
        `${noCarrot ? 'obfuscated-link' : 'obfuscated-link__decorative'}`,
      ]
    : [
        'usa-button',
        `${noCarrot ? 'obfuscated-link' : 'obfuscated-link__decorative'}`,
      ]

  return (
    <div className={useHandleClassName({ className, defaultClasses })}>
      <a href={href} rel={rel} target={target} {...props}>
        {children}
      </a>
    </div>
  )
}

ObfuscatedLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  ext: PropTypes.bool,
}

export default ObfuscatedLink
