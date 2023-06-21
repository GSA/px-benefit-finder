import Button from './index.jsx'

export default {
  component: Button,
}

export const Primary = {
  render: () => <Button>Button</Button>,
}

export const Lighter = {
  render: () => <Button className={'lighter'}>Button</Button>,
}
