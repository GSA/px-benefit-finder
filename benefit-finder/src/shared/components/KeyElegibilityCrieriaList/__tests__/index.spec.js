import renderer from 'react-test-renderer'
import KeyElegibilityCrieriaList from '../index.jsx'

describe('KeyElegibilityCrieriaList', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<KeyElegibilityCrieriaList />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
