import renderer from 'react-test-renderer'
import Radio from '../index.jsx'

describe('Radio', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Radio />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
