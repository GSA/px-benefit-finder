import renderer from 'react-test-renderer'
import ProcessList from '../index.jsx'

describe('ProcessList', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<ProcessList />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
