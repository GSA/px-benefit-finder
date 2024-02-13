import { render } from '@testing-library/react'
import StepBackLink from '../index.jsx'

describe('StepBackLink', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<StepBackLink />)
    expect(asFragment()).toMatchSnapshot()
  })
})
