import { render } from '@testing-library/react'
import ShareButton from '../index.jsx'

describe('Share', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<ShareButton />)
    expect(asFragment()).toMatchSnapshot()
  })
})
