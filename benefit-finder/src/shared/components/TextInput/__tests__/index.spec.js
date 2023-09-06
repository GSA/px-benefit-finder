import renderer from 'react-test-renderer'
import TextInput from '../index.jsx'

describe('TextInput', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<TextInput />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
