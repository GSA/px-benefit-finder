import renderer from 'react-test-renderer'
import Date from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('Date', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Date ui={en} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
