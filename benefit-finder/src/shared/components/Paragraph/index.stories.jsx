import Paragraph from './index.jsx'

export default {
  component: Paragraph,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    weight: {
      options: ['regular', 'bold', 'extrabold', 'light', 'thin'],
      control: { weight: 'radio' },
    },
  },
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur. Consectetur felis fermentum eu nunc elit imperdiet. Aenean porta sem sed nulla rutrum orci morbi non. Sollicitudin proin lorem magna ultrices gravida sem donec.',
  },
}

export const Regular = {
  args: {
    weight: 'regular',
  },
}

export const Bold = {
  args: {
    weight: 'bold',
  },
}

export const ExtraBold = {
  args: {
    weight: 'extrabold',
  },
}

export const Light = {
  args: {
    weight: 'light',
  },
}

export const Thin = {
  args: {
    weight: 'thin',
  },
}
