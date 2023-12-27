/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types'
import { Heading } from '../index'
import createMarkup from '../../utils/createMarkup'
import './_index.scss'

/**
 * a functional component that renders an svg image
 * @component
 * @return {html} returns a semantic svg element
 */
const SVGICON = ({ color, lifeEvent, className }) => {
  const DOLO = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="95%"
      width="95%"
      viewBox="0 0 223 268"
      fill="none"
      aria-hidden="true"
      class={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M89.1979 29.7785C89.1979 46.224 75.8848 59.5544 59.4637 59.5544C43.0426 59.5544 29.732 46.224 29.732 29.7785C29.732 13.3329 43.0426 0 59.4637 0C75.8848 0 89.1979 13.3329 89.1979 29.7785ZM14.8624 74.4449H102.017L106.151 77.8946L146.617 111.666H208.134L223 200.999H200.7V267.999H170.966V178.666H185.834L181.377 151.883L179.811 141.445H179.639L178.4 133.999H126.366L91.251 104.221H43.1862L38.7262 148.887H52.0342V268H22.3V178.667H0L14.8624 74.4449ZM96.6333 148.885H66.8991V267.997H96.6333V148.885ZM126.365 148.885H156.099V267.997H126.365V148.885ZM193.265 66.9984C193.265 83.4439 179.954 96.7768 163.533 96.7768C147.112 96.7768 133.799 83.4439 133.799 66.9984C133.799 50.5528 147.112 37.2199 163.533 37.2199C179.954 37.2199 193.265 50.5528 193.265 66.9984Z"
        fill={color || '#73A9D9'}
        fill-opacity="0.08"
      />
    </svg>
  )

  const Retirement = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="223"
      height="268"
      viewBox="0 0 223 268"
      fill="none"
      aria-hidden="true"
      class={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M89.1979 29.7785C89.1979 46.224 75.8848 59.5544 59.4637 59.5544C43.0426 59.5544 29.732 46.224 29.732 29.7785C29.732 13.3329 43.0426 0 59.4637 0C75.8848 0 89.1979 13.3329 89.1979 29.7785ZM14.8624 74.4449H102.017L106.151 77.8946L146.617 111.666H208.134L223 200.999H200.7V267.999H170.966V178.666H185.834L181.377 151.883L179.811 141.445H179.639L178.4 133.999H126.366L91.251 104.221H43.1862L38.7262 148.887H52.0342V268H22.3V178.667H0L14.8624 74.4449ZM96.6333 148.885H66.8991V267.997H96.6333V148.885ZM126.365 148.885H156.099V267.997H126.365V148.885ZM193.265 66.9984C193.265 83.4439 179.954 96.7768 163.533 96.7768C147.112 96.7768 133.799 83.4439 133.799 66.9984C133.799 50.5528 147.112 37.2199 163.533 37.2199C179.954 37.2199 193.265 50.5528 193.265 66.9984Z"
        fill={color || 'white'}
        fill-opacity="0.08"
      />
    </svg>
  )

  return lifeEvent === 'retirement' ? Retirement : DOLO
}

/**
 * a functional component to create a heading block with chevron styling
 * @function
 * @param {string} heading - The inherited heading value
 * @param {string} description - set as html
 * @return {html} returns a semantic html label
 */
const Chevron = ({ heading, description }) => {
  return (
    <div className="chevron">
      {/* <div className="chevron-icon-wrapper grid-container">
        <SVGICON className="chevron-icon" lifeEvent="death" />
      </div> */}
      <div className="grid-container">
        <Heading className="chevron-heading" headingLevel={1}>
          {heading}
        </Heading>
        <div
          className="chevron-description"
          dangerouslySetInnerHTML={createMarkup(description)}
        />
        <SVGICON className="chevron-icon" lifeEvent="death" />
      </div>
    </div>
  )
}

Chevron.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
}

export default Chevron
