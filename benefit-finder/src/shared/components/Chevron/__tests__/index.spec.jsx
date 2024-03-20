import { render } from '@testing-library/react'
import Chevron from '../index.jsx'

describe('Chevron', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Chevron />)
    expect(asFragment()).toMatchSnapshot()
  })
})
