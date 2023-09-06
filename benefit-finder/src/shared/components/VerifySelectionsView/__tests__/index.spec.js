import renderer from 'react-test-renderer'
import VerifySelectionsView from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('VerifySelectionsView', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(
      <VerifySelectionsView ui={en.verifySelectionsView} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
