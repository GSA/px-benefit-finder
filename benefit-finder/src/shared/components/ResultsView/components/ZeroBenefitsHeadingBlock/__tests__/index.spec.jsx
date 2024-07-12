import { render } from '@testing-library/react'
import ZeroBenefitsHeadingBlock from '../index.jsx'
import * as en from '../../../../../locales/en/en.json'

describe('ZeroBenefitsHeadingBlock', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<ZeroBenefitsHeadingBlock ui={en} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
