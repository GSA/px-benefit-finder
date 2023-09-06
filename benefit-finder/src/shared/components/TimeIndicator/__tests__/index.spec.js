import renderer from 'react-test-renderer'
import TimeIndicator from '../index.jsx'

describe('TimeIndicator', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<TimeIndicator />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
