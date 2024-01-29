import { render } from '@testing-library/react'
import RelativeBenefitList from '../index.jsx'

describe('RelativeBenefitList', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<RelativeBenefitList />)
    expect(asFragment()).toMatchSnapshot()
  })
})
