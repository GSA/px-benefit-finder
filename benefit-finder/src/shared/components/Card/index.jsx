import PropTypes from 'prop-types'
import { Heading, Carrot } from '../index'
import { useHandleClassName } from '../../hooks'
import { createMarkup } from '../../utils'
import './_index.scss'

/**
 * a functional component that renders a usa-card component
 * @component
 * @param {string} className - inherited class(es)
 * @param {string} href - location
 * @param {string} title - content
 * @param {string} body - content
 * @param {string} cta - content
 * @param {noCarrot} boolean - adds a decorative carrot to the link
 * @return {html} returns a semantic html list element
 */
const Card = ({ className, title, body, cta, href, noCarrot, carrotType }) => {
  const defaultClasses = ['add-list-reset']
  const handleCarrot =
    noCarrot === true ? null : <Carrot color="#162E51" type={carrotType} />

  return (
    <li
      className={useHandleClassName({
        className,
        defaultClasses,
      })}
      key={`${title}`}
    >
      <a className="bf-usa-card__container usa-card__container" href={href}>
        <div className="bf-usa-card__header usa-card__header">
          <Heading
            className="bf-usa-card__heading usa-card__heading"
            headingLevel={3}
          >
            {title}
          </Heading>
        </div>
        <div
          className="bf-usa-card__body usa-card__body"
          dangerouslySetInnerHTML={createMarkup(body)}
        />
        <div className="bf-usa-card__cta usa-card__cta">{cta}</div>
        {handleCarrot}
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
