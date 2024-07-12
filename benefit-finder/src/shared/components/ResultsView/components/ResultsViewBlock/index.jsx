import PropTypes from 'prop-types'
import {
  BenefitAccordionGroup,
  Button,
  EmailButton,
  Heading,
  StepBackLink,
  Chevron,
  ShareButton,
  RelativeBenefitList,
} from '../../../index'
import {
  ZeroBenefitsHeadingBlock,
  EligibleBenefitsHeadingBlock,
  NotEligibleBenefitsHeadingBlock,
} from '../index'
import * as apiCalls from '../../../../api/apiCalls'
import { createMarkup } from '../../../../utils'

import './_index.scss'

const ResultsViewBlock = ({
  notEligibleView,
  zeroBenefitsResult,
  stepDataArray,
  isExpandAll,
  setExpandAll,
  handleStepBack,
  handleViewToggle,
  data,
  relevantBenefits,
  resetElement,
  ui,
}) => {
  // Results view components
  const ResultsViewChevronBlock = ({
    notEligibleView,
    zeroBenefitsResult,
    ui,
  }) => {
    const { eligible, notEligible, zeroBenefits } = ui
    return (
      <Chevron
        heading={
          notEligibleView === false
            ? (zeroBenefitsResult && zeroBenefits?.chevron.heading) ||
              eligible?.chevron.heading
            : (zeroBenefitsResult && zeroBenefits?.chevron.heading) ||
              notEligible?.chevron.heading
        }
        description={
          notEligibleView === false
            ? (zeroBenefitsResult && zeroBenefits?.chevron.description) ||
              eligible?.chevron.description
            : (zeroBenefitsResult && zeroBenefits?.chevron.description) ||
              notEligible?.chevron.description
        }
      />
    )
  }

  const ResultsViewHeadingBlock = ({
    zeroBenefitsResult,
    notEligibleView,
    ui,
  }) => {
    const { notEligible, eligible, summaryBox, zeroBenefits } = ui
    return zeroBenefitsResult ? (
      <ZeroBenefitsHeadingBlock
        handleViewToggle={handleViewToggle}
        notEligibleView={notEligibleView}
        ui={zeroBenefits}
      />
    ) : notEligibleView ? (
      <NotEligibleBenefitsHeadingBlock ui={{ notEligible, summaryBox }} />
    ) : (
      <EligibleBenefitsHeadingBlock ui={{ eligible, summaryBox }} />
    )
  }

  const ResultsStepBackLink = ({ notEligibleView, handleStepBack, ui }) => {
    const { stepBackLink } = ui
    return notEligibleView === false ? (
      <StepBackLink
        onClick={() => resetElement.current.focus()}
        setCurrent={handleStepBack}
      >
        {stepBackLink}
      </StepBackLink>
    ) : (
      <Button
        className="bf-step-back-link"
        onClick={() => handleViewToggle()}
        unstyled
      >
        {stepBackLink}
      </Button>
    )
  }

  const ResultsNotEligibleCTA = ({ handleViewToggle, ui }) => {
    const { notEligibleResults } = ui
    return (
      <div className="bf-result-view-unmet">
        <Heading className="bf-result-view-unmet-heading" headingLevel={3}>
          {notEligibleResults?.heading}
        </Heading>
        <p
          dangerouslySetInnerHTML={createMarkup(
            notEligibleResults?.description
          )}
        />
        <Button onClick={handleViewToggle}>{notEligibleResults?.cta}</Button>
      </div>
    )
  }

  const ResultsViewShareResults = ({ stepDataArray, ui }) => {
    const { shareResults } = ui
    return (
      <div className="bf-result-view-share-results">
        <Heading
          className="bf-result-view-share-results-heading"
          headingLevel={3}
        >
          {shareResults?.heading}
        </Heading>
        <p>{shareResults?.description}</p>
        <div className="bf-result-view-share-results-button-group">
          <ShareButton
            ui={shareResults}
            data={stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)}
          />
          <EmailButton
            ui={shareResults}
            data={stepDataArray && apiCalls.GET.SelectedValueAll(stepDataArray)}
          />
        </div>
      </div>
    )
  }

  const ResultsViewRelevantBenefits = ({ relevantBenefits, ui }) => {
    const { resultsRelativeBenefits } = ui
    return (
      <div className="bf-result-view-relvant-benefits">
        <Heading
          className="bf-result-view-relvant-benefits-heading"
          headingLevel={3}
        >
          {resultsRelativeBenefits?.heading}
        </Heading>
        {relevantBenefits && (
          <RelativeBenefitList
            data={relevantBenefits}
            carrotType="carrot-big"
          ></RelativeBenefitList>
        )}
      </div>
    )
  }

  const ResultsViewAccordions = ({
    zeroBenefitsResult,
    notEligibleView,
    stepDataArray,
    isExpandAll,
    setExpandAll,
    ui,
  }) => {
    return (
      <div className="bf-result-view-benefits">
        <BenefitAccordionGroup
          data={
            stepDataArray &&
            apiCalls.GET.ElegibilityByCriteria(
              apiCalls.GET.SelectedValueAll(stepDataArray),
              data
            )
          }
          entryKey={'benefit'}
          notEligibleView={notEligibleView}
          expandAll={
            zeroBenefitsResult === false ||
            (zeroBenefitsResult && notEligibleView)
          }
          isExpandAll={isExpandAll}
          setExpandAll={setExpandAll}
          ui={ui}
        />
      </div>
    )
  }

  return (
    <>
      <ResultsViewChevronBlock
        notEligibleView={notEligibleView}
        zeroBenefitsResult={zeroBenefitsResult}
        ui={ui}
      />
      <div className="bf-grid-container grid-container">
        <div className="bf-result-view-details">
          <ResultsStepBackLink
            notEligibleView={notEligibleView}
            ui={ui}
            handleStepBack={handleStepBack}
          />

          <ResultsViewHeadingBlock
            zeroBenefitsResult={zeroBenefitsResult}
            notEligibleView={notEligibleView}
            ui={ui}
          />

          {/* map all the benefits into accordions */}
          <ResultsViewAccordions
            zeroBenefitsResult={zeroBenefitsResult}
            notEligibleView={notEligibleView}
            isExpandAll={isExpandAll}
            setExpandAll={setExpandAll}
            stepDataArray={stepDataArray}
            ui={ui}
          />

          {notEligibleView === false && zeroBenefitsResult === false && (
            <ResultsNotEligibleCTA
              notEligibleView={notEligibleView}
              zeroBenefitsResult={zeroBenefitsResult}
              handleViewToggle={handleViewToggle}
              ui={ui}
            />
          )}

          {relevantBenefits?.length > 0 && (
            <ResultsViewRelevantBenefits
              relevantBenefits={relevantBenefits}
              ui={ui}
            />
          )}

          <ResultsViewShareResults stepDataArray={stepDataArray} ui={ui} />
        </div>
      </div>
    </>
  )
}

ResultsViewBlock.propTypes = {
  props: PropTypes.any,
}

export default ResultsViewBlock
