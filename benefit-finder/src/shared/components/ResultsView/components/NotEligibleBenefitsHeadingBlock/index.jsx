import PropTypes from 'prop-types'
import { Summary, Heading } from '../../../index'
import { createMarkup } from '../../../../utils'
import './_index.scss'

const NotEligibleBenefitsHeadingBlock = ({ ui }) => {
  console.log(ui)
  const { notEligible, summaryBox } = ui
  return (
    <div>
      <Heading className="bf-not-eligible-view-heading" headingLevel={2}>
        {notEligible?.heading}
      </Heading>
      <Heading
        className="bf-not-eligible-view-description"
        headingLevel={3}
        dangerouslySetInnerHTML={createMarkup(notEligible?.description)}
      />
      <Summary
        heading={summaryBox?.heading}
        listItems={summaryBox?.list}
        cta={summaryBox?.cta}
      />
    </div>
  )
}

NotEligibleBenefitsHeadingBlock.propTypes = {
  props: PropTypes.any,
}

export default NotEligibleBenefitsHeadingBlock
