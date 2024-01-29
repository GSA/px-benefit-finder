import { render } from '@testing-library/react'
import StepIndicator from '../index.jsx'

describe('StepIndicator', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<StepIndicator />)
    expect(asFragment()).toMatchSnapshot()
  })
})
