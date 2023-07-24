import renderer from 'react-test-renderer'
import Modal from '../index.jsx'

describe('Modal', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Modal />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
