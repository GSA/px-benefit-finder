import { render } from '@testing-library/react'
import BenefitAccordionGroup from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('BenefitAccordionGroup', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<BenefitAccordionGroup ui={en.resultsView} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
