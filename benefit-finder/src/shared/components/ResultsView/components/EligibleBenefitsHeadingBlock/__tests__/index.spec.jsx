import { render } from '@testing-library/react'
import EligibleBenefitsHeadingBlock from '../index.jsx'
import * as en from '../../../../../locales/en/en.json'

const { eligible, summaryBox } = en

describe('EligibleBenefitsHeadingBlock', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(
      <EligibleBenefitsHeadingBlock ui={{ eligible, summaryBox }} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
