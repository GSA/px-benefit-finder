import renderer from 'react-test-renderer'
import NoticesList from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('NoticesList', () => {
  const t = en
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(
      <NoticesList data={t.intro.notices.list} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
