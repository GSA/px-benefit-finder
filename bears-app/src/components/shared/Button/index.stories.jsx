import Button from './index.jsx'

export default {
  component: Button,
}

export const Primary = {
  render: () => <Button>Button</Button>,
}

export const Secondary = {
  render: () => <Button className="border-2px">Button</Button>,
}
