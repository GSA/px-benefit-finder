import PropTypes from 'prop-types'
import { Card } from '../index'

/**
 * a functional component that renders a list of usa-card component(s)
 * @component
 * @param {array} data - passed benefits data
 * @return {html} returns a semantic html unorderd list element
 */
const RelativeBenefitList = ({ data, carrotType }) => {
  return (
    <ul className="usa-card-group">
      {data &&
        data.map((item, i) => {
          const { title, link, cta, body } = item.lifeEvent

          return (
            <Card
              className="relative-benefit-card tablet:grid-col-12"
              title={title}
              cta={cta}
              href={link}
              body={body}
              key={`${title}-${i}`}
              carrotType={carrotType}
            />
          )
        })}
    </ul>
  )
}

RelativeBenefitList.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
}

export default RelativeBenefitList
