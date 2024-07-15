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
  ZeroBenefitsHeading,
  EligibleBenefitsHeading,
  NotEligibleBenefitsHeading,
} from '../blocks/index'
import * as apiCalls from '../../../../api/apiCalls'
import { createMarkup } from '../../../../utils'

import './_index.scss'

const Results = ({
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
  const ResultsChevronBlock = ({ notEligibleView, zeroBenefitsResult, ui }) => {
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

  const ResultsHeadingBlock = ({ zeroBenefitsResult, notEligibleView, ui }) => {
    const { notEligible, eligible, summaryBox, zeroBenefits } = ui
    return zeroBenefitsResult ? (
      <ZeroBenefitsHeading
        handleViewToggle={handleViewToggle}
        notEligibleView={notEligibleView}
        ui={zeroBenefits}
      />
    ) : notEligibleView ? (
      <NotEligibleBenefitsHeading ui={{ notEligible, summaryBox }} />
    ) : (
      <EligibleBenefitsHeading ui={{ eligible, summaryBox }} />
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

  const NotEligibleCTA = ({ handleViewToggle, ui }) => {
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

  const ShareResults = ({ stepDataArray, ui }) => {
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

  const RelevantBenefits = ({ relevantBenefits, ui }) => {
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

  const BenefitAccordions = ({
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
      <ResultsChevronBlock
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

          <ResultsHeadingBlock
            zeroBenefitsResult={zeroBenefitsResult}
            notEligibleView={notEligibleView}
            ui={ui}
          />

          {/* map all the benefits into accordions */}
          <BenefitAccordions
            zeroBenefitsResult={zeroBenefitsResult}
            notEligibleView={notEligibleView}
            isExpandAll={isExpandAll}
            setExpandAll={setExpandAll}
            stepDataArray={stepDataArray}
            ui={ui}
          />

          {notEligibleView === false && zeroBenefitsResult === false && (
            <NotEligibleCTA
              notEligibleView={notEligibleView}
              zeroBenefitsResult={zeroBenefitsResult}
              handleViewToggle={handleViewToggle}
              ui={ui}
            />
          )}

          {relevantBenefits?.length > 0 && (
            <RelevantBenefits relevantBenefits={relevantBenefits} ui={ui} />
          )}

          <ShareResults stepDataArray={stepDataArray} ui={ui} />
        </div>
      </div>
    </>
  )
}

Results.propTypes = {
  props: PropTypes.any,
}

export default Results
