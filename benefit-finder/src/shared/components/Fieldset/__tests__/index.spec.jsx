import { render } from '@testing-library/react'
import Fieldset from '../index.jsx'

describe('Fieldset', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Fieldset />)
    expect(asFragment()).toMatchSnapshot()
  })
})
