import PropTypes from 'prop-types'
import { Button, Heading } from '../../../../index'
import { createMarkup } from '../../../../../utils'

import './_index.scss'

const ZeroBenefitsHeadingBlock = ({
  handleViewToggle,
  notEligibleView,
  ui,
}) => {
  return (
    <>
      <Heading className="bf-zero-benefits-view-heading" headingLevel={2}>
        {ui?.heading}
      </Heading>
      <Heading
        className="bf-zero-benefits-view-description"
        headingLevel={3}
        dangerouslySetInnerHTML={createMarkup(ui?.description)}
      />
      {!notEligibleView && (
        <div className="bf-zero-benefits-view-cta">
          <Button onClick={handleViewToggle} secondary>
            {ui?.cta}
          </Button>
        </div>
      )}
    </>
  )
}

ZeroBenefitsHeadingBlock.propTypes = {
  handleViewToggle: PropTypes.func,
  notEligibleView: PropTypes.bool,
  ui: PropTypes.object,
}

export default ZeroBenefitsHeadingBlock
