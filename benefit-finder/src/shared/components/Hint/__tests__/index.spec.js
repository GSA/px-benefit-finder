import renderer from 'react-test-renderer'
import Hint from '../index.jsx'

describe('Hint', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Hint />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
