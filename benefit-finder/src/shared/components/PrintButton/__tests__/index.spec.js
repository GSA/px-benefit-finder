import renderer from 'react-test-renderer'
import PrintButton from '../index.jsx'

describe('PrintButton', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<PrintButton />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
