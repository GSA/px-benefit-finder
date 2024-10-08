import PropTypes from 'prop-types'
import { Card } from '@components'

/**
 * a functional component that renders a list of usa-card component(s)
 * @component
 * @param {array} data - passed benefits data
 * @param {string} carrotType - determines display type
 * @return {html} returns a semantic html unorderd list element
 */
const RelativeBenefitList = ({ data, carrotType }) => {
  return (
    <ul className="bf-usa-card-group usa-card-group">
      {data &&
        data.map((item, i) => {
          const { title, searchTitle, link, cta, body, lifeEventId } =
            item.lifeEvent
          const trimedLifeEventId = lifeEventId.replace('es_', '')

          return (
            <Card
              className="bf-usa-card--relative-benefit bf-usa-card usa-card tablet:grid-col-12"
              title={searchTitle || title}
              cta={cta}
              href={link}
              body={body}
              key={`${title}-${i}`}
              carrotType={carrotType}
              icon={trimedLifeEventId}
              data-testid={trimedLifeEventId}
            />
          )
        })}
    </ul>
  )
}

RelativeBenefitList.propTypes = {
  data: PropTypes.array,
  carrotType: PropTypes.string,
}

export default RelativeBenefitList
