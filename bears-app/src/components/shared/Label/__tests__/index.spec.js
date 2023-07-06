import renderer from 'react-test-renderer'
import Label from '../index.jsx'

describe('Label', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Label />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
