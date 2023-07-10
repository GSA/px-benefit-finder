import renderer from 'react-test-renderer'
import ButtonGroup from '../index.jsx'

describe('ButtonGroup', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<ButtonGroup />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
