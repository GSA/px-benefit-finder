import { useHandleClassName } from '../hooks/useHandleClassName'
import PropTypes from 'prop-types'
import './_index.scss'

const ObfuscatedLink = ({ children, className, href, rel, target, ext }) => {
  const defaultClasses = ext
    ? ['usa-button', 'usa-link--external', 'obfuscated-link']
    : ['usa-button', 'obfuscated-link']

  return (
    <div className={useHandleClassName({ className, defaultClasses })}>
      <a href={href} rel={rel} target={target}>
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
