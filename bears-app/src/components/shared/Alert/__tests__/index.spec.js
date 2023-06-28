import renderer from 'react-test-renderer'
import Alert from '../index.jsx'

describe('Alert', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Alert />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
