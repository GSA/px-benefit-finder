import RelativeBenefitList from './index.jsx'

const data = [
  {
    title: 'Approaching Retirement',
    cta: 'Learn More',
  },
  {
    title: 'Living with disability or illness',
    cta: 'Learn More',
  },
]

export default {
  component: RelativeBenefitList,
  tags: ['autodocs'],
  args: {
    data,
  },
}

export const Primary = {}
