import { useHandleClassName } from '../../hooks/useHandleClassName'
import arrow from './assets/arrow.svg'
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
}) => {
  // set our link as external, will be decorated by uswds css
  const defaultClasses = ext
    ? ['usa-button', 'usa-link--external', 'obfuscated-link']
    : ['usa-button', 'obfuscated-link']

  /**
   * a functional component that renders an svg image
   * @component
   * @return {html} returns html
   */
  const Carrot = ({ src }) => (
    <img className="carrot" src={src} alt="a triangle icon" />
  )

  return (
    <a
      href={href}
      rel={rel}
      target={target}
      className={useHandleClassName({ className, defaultClasses })}
    >
      {children}
      {noCarrot === true ? null : <Carrot src={arrow} />}
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
