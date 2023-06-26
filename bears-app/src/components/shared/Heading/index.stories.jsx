import Heading from './index.jsx'

export default {
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'Heading text',
    },
    headingLevel: {
      control: 'number',
      defaultValue: 1,
    },
  },
}

export const Heading1 = {
  args: {
    children: '32 pt H1 Heading 1 -  Sample',
    headingLevel: 1,
  },
}

export const Heading2 = {
  args: {
    children: '24 pt H2 Heading 2 -  Sample',
    headingLevel: 2,
  },
}

export const Heading3 = {
  args: {
    children: '22 pt H3 Heading 3 -  Sample',
    headingLevel: 3,
  },
}

export const Heading4 = {
  args: {
    children: '20 pt H4 Heading 4 -  Sample',
    headingLevel: 4,
  },
}

export const Heading5 = {
  args: {
    children: '16 pt H5 Heading 5 -  Sample',
    headingLevel: 5,
  },
}
