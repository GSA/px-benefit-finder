import { render } from '@testing-library/react'
import EmailButton from '../index.jsx'

describe('Email', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<EmailButton />)
    expect(asFragment()).toMatchSnapshot()
  })
})
