import { render } from '@testing-library/react'
import NotEligibleBenefitsHeadingBlock from '../index.jsx'
import * as en from '../../../../../locales/en/en.json'

const { notEligible, summaryBox } = en

describe('NotEligibleBenefitsHeadingBlock', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(
      <NotEligibleBenefitsHeadingBlock ui={{ notEligible, summaryBox }} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
