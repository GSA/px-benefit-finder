import { render } from '@testing-library/react'
import Carrot from '../index.jsx'

describe('Carrot', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Carrot />)
    expect(asFragment()).toMatchSnapshot()
  })
})
