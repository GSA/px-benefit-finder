import { render } from '@testing-library/react'
import Alert from '../index.jsx'

describe('Alert', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Alert />)
    expect(asFragment()).toMatchSnapshot()
  })
})
