import { render } from '@testing-library/react'
import ZeroBenefitsHeading from '../index.jsx'
import * as en from '@locales/en/en.json'

describe('ZeroBenefitsHeading', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<ZeroBenefitsHeading ui={en} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
