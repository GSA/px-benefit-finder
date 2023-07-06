import renderer from 'react-test-renderer'
import Fieldset from '../index.jsx'

describe('Fieldset', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Fieldset />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
