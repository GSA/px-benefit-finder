const dataLayerStructure = {
  intro: {
    event: 'bf_page_change',
    bfData: { pageView: 'bf-intro', viewTitle: null },
  },
  lifeEventSection: {
    event: 'bf_page_change',
    bfData: {
      pageView: 'bf-form',
      viewTitle: null,
    },
  },
  modal: {
    event: 'bf_page_change',
    bfData: {
      pageView: 'bf-form-completion-modal',
      viewTitle: null,
    },
  },
  verifySelections: {
    event: 'bf_page_change',
    bfData: {
      pageView: 'bf-verify-selections',
      viewTitle: null,
    },
  },
  resultsView: {
    event: 'bf_page_change',
    bfData: {
      pageView: ['bf-result-eligible-view', 'bf-result-not-eligible-view'],
      viewTitle: null,
      viewState: [
        'bf-not-eligible-view',
        'bf-eligible-view',
        'bf-not-eligible-view-zero-benefits',
        'bf-eligible-view-zero-benefits',
      ],
    },
  },
  openAllBenefitAccordions: {
    event: 'bf_open_all_accordions',
    bfData: {
      accordionsOpen: true,
    },
  },
  benefitAccordion: {
    event: 'bf_accordion_open',
    bfData: {
      benefitTitle: null,
    },
  },
  benefitLink: {
    event: 'bf_benefit_link',
    bfData: {
      benefitTitle: null,
    },
  },
  benefitCount: { event: 'bf_count', bfData: null },
}

export default dataLayerStructure
