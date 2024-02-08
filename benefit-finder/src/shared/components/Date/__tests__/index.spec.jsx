import { render } from '@testing-library/react'
import Date from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('Date', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Date ui={en} onChange={() => {}} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
