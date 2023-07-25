import PropTypes from 'prop-types'
import { Heading, Carrot, Paragraph } from '../index'
import { useHandleClassName } from '../../hooks/useHandleClassName'
import './_index.scss'

/**
 * a functional component that renders a usa-card component
 * @component
 * @param {string} className - inherited class(es)
 * @param {string} href - location
 * @param {string} title - content
 * @param {string} body - content
 * @param {noCarrot} boolean - adds a decorative carrot to the link
 * @return {html} returns a semantic html list element
 */
const Card = ({ className, title, body, href, noCarrot }) => {
  const defaultClasses = ['usa-card add-list-reset']
  return (
    <li
      className={useHandleClassName({
        className,
        defaultClasses,
      })}
    >
      <a href={href}>
        <div className="usa-card__container">
          <div className="usa-card__header">
            <Heading className="usa-card__heading" headingLevel={3}>
              {title}
            </Heading>
          </div>
          <Paragraph className="usa-card__body">{body}</Paragraph>
          {noCarrot === true ? null : <Carrot color="#162E51" />}
        </div>
      </a>
    </li>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  href: PropTypes.string,
  noCarrot: PropTypes.bool,
}

export default Card
