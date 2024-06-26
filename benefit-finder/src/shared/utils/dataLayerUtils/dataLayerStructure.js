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
    event: 'bf_modal_open',
    bfData: {
      modalOpen: false,
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
      pageView: 'bf-result-view',
      viewTitle: null,
      viewState: [
        'bf-not-eligible-view',
        'bf-eligible-view',
        'bf-not-eligible-view-zero-benefits',
        'bf-eligible-view-zero-benefits',
      ],
    },
  },
  benefitCount: { event: 'bf_count', bfData: null },
}

export default dataLayerStructure
