import renderer from 'react-test-renderer'
import StepBackLink from '../index.jsx'

describe('StepBackLink', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<StepBackLink />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
