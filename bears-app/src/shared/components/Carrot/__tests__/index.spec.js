import renderer from 'react-test-renderer'
import Carrot from '../index.jsx'

describe('Carrot', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Carrot />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
