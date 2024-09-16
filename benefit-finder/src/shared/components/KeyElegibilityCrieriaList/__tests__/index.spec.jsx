import { render } from '@testing-library/react'
import KeyElegibilityCrieriaList from '../index.jsx'
import * as en from '@locales/en/en.json'

describe('KeyElegibilityCrieriaList', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(
      <KeyElegibilityCrieriaList ui={en.resultsView.benefitAccordion} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
