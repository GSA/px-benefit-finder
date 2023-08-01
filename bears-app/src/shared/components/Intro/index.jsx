import PropTypes from 'prop-types'
import {
  Button,
  Chevron,
  Heading,
  NoticesList,
  ProcessList,
  TimeIndicator,
} from '../index'

const Intro = ({ data, ui, setStep, step }) => {
  const { timeEstimate, title, summary } = data
  const { heading, timeIndicator, steps, notices, button } = ui

  return (
    data && (
      <div>
        <Chevron heading={title} description={summary} />
        <Heading headingLevel={2}>{heading}</Heading>
        <TimeIndicator
          description={timeIndicator}
          timeEstimate={timeEstimate}
        />
        <ProcessList steps={steps.list} description={steps.title} />
        <Heading headingLevel={2}>{notices.title}</Heading>
        <NoticesList data={notices.list} />
        <Button onClick={() => setStep(step + 1)}>{button}</Button>
      </div>
    )
  )
}

Intro.propTypes = {
  data: PropTypes.object,
  ui: PropTypes.object,
  setStep: PropTypes.func,
  step: PropTypes.number,
}

export default Intro
