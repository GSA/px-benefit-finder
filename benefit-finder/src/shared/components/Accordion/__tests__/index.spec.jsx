import { render } from '@testing-library/react'
import Accordion from '../index.jsx'

describe('Accordion', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Accordion />)
    expect(asFragment()).toMatchSnapshot()
  })
})
