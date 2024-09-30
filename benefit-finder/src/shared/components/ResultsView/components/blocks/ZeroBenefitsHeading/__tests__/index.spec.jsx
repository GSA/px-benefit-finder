import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ZeroBenefitsHeading from '../index.jsx'
import * as en from '@locales/en/en.json'

describe('ZeroBenefitsHeading', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<ZeroBenefitsHeading ui={en} />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
