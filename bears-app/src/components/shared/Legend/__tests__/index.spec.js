import renderer from 'react-test-renderer'
import Legend from '../index.jsx'

describe('Legend', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Legend />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
