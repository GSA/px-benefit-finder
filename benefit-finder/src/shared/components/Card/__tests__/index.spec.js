import renderer from 'react-test-renderer'
import Card from '../index.jsx'

describe('Card', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Card />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
