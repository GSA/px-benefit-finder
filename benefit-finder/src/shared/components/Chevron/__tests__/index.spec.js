import renderer from 'react-test-renderer'
import Chevron from '../index.jsx'

describe('Chevron', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Chevron />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
