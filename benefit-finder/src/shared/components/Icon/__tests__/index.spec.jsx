import { render } from '@testing-library/react'
import Icon from '../index.jsx'

describe('Icon', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Icon type="close" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
