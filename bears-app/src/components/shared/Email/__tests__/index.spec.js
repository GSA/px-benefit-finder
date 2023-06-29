import renderer from 'react-test-renderer'
import Email from '../index.jsx'

describe('Email', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Email />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
