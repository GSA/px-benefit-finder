import renderer from 'react-test-renderer'
import StepIndicator from '../index.jsx'

describe('StepIndicator', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<StepIndicator />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
