import renderer from 'react-test-renderer'
import EmailButton from '../index.jsx'

describe('Email', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<EmailButton />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
