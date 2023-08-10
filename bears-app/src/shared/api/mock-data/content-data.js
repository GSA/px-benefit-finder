const content = `{
  "lifeEventForm": {
    "id": "death-of-a-loved-one",
    "timeEstimate": "60 minutes",
    "titlePrefix": "What to do when someone dies?",
    "title": "Benefit Finder After Losing A Loved One",
    "summary": "<p>We are sorry about your loss. You and your family may be eligible for survivor benefits from the government following a family member's death. Learn how to find the benefits you may qualify for.</p>",
    "relevantBenefits": [
      {
        "lifeEvent": {
          "title": "Approaching Retirement",
          "body": "Addition Descriptions",
          "link": "/retirement"
        }
      },
      {
        "lifeEvent": {
          "title": "Living with Disability or an Illness",
          "body": "Addition Descriptions",
          "link": "/disability"
        }
      }
    ],
    "sectionsEligibilityCriteria": [
      {
        "section": {
          "heading": "About the Applicant",
          "description": "The applicant is the person who will receive the benefits.",
          "fieldsets": [
            {
              "fieldset": {
                "criteriaKey": "applicant_date_of_birth",
                "legend": "Date of birth",
                "required": "FALSE",
                "hint": "For example: 4 28 1986",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_date_of_birth",
                      "type": "date",
                      "name": "Date of birth",
                      "label": "Date of birth",
                      "values": [
                        {
                          "default": "",
                          "value": ""
                        }
                      ],
                      "hasChild": false,
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "applicant_relation",
                "legend": "Applicant's relationship to the person who died",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_relation",
                      "type": "select",
                      "name": "Applicant's relationship to the person who died",
                      "label": "Applicant's relationship to the person who died",
                      "values": [
                        {
                          "option": "-Select-",
                          "value": "-Select-"
                        },
                        {
                          "option": "spouse",
                          "value": "spouse"
                        },
                        {
                          "option": "child",
                          "value": "child"
                        },
                        {
                          "option": "parent",
                          "value": "parent"
                        },
                        {
                          "option": "other family member",
                          "value": "other family member"
                        },
                        {
                          "option": "personal/official representative",
                          "value": "personal/official representative"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "applicant_marital_status",
                "legend": "Marital status",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_marital_status",
                      "type": "select",
                      "name": "Marital status",
                      "label": "Marital status",
                      "values": [
                        {
                          "option": "-Select-",
                          "value": "-Select-"
                        },
                        {
                          "option": "married",
                          "value": "married"
                        },
                        {
                          "option": "not married",
                          "value": "not married"
                        },
                        {
                          "option": "widowed",
                          "value": "widowed"
                        },
                        {
                          "option": "divorced",
                          "value": "divorced"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "applicant_care_for_child",
                "legend": "Applicant care for child",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_care_for_child",
                      "type": "radio",
                      "name": "Applicant care for child",
                      "label": "You are caring for the child of the person who died, is retired or has disabilities, and the child is under age 16 or is disabled.",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "applicant_paid_funeral_expenses",
                "legend": "Applicant paid funeral expenses",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_paid_funeral_expenses",
                      "type": "radio",
                      "name": "Applicant paid funeral expense",
                      "label": "You paid for the funeral/burial expenses.",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "applicant_funeral_reimbursment",
                "legend": "Applicant funeral reimbursement",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_funeral_reimbursment",
                      "type": "radio",
                      "name": "Applicant funeral reimbursement",
                      "label": "You were NOT reimbursed for the funeral/burial cost by any organization or government agency.",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "applicant_citizen_status",
                "legend": "Applicant citizen status",
                "required": "TRUE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "applicant_citizen_status",
                      "type": "radio",
                      "name": "Applicant citizen status",
                      "label": "You are a U.S. citizen or eligible non-citizen.",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "section": {
          "heading": "About the Person Who Died",
          "description": "",
          "fieldsets": [
            {
              "fieldset": {
                "criteriaKey": "deceased_date_of_death",
                "legend": "Deceased date of death",
                "required": "FALSE",
                "hint": "For example: 4 28 1986",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_date_of_death",
                      "type": "date",
                      "name": "Deceased date of death",
                      "label": "The deceased died on the following date:",
                      "values": [
                        {
                          "default": "",
                          "value": ""
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_date_of_funeral",
                "legend": "Deceased date of funeral",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_date_of_funeral",
                      "type": "date",
                      "name": "Deceased date of funeral",
                      "label": "The deceased's funeral/burial was on the following date:",
                      "values": [
                        {
                          "default": "",
                          "value": ""
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_paid_into_SS",
                "legend": "Deceased paid into Social Security",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_paid_into_SS",
                      "type": "radio",
                      "name": "Deceased paid into Social Security",
                      "label": "The deceased worked and paid Social Security taxes on their earnings.",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_died_of_COVID",
                "legend": "Deceased died of COVID",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_died_of_COVID",
                      "type": "radio",
                      "name": "Deceased died of COVID",
                      "label": "The deceased died or likely died of COVID-19.",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_death_location_is_US",
                "legend": "Deceased death location is US",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_death_location_is_US",
                      "type": "radio",
                      "name": "Deceased death location is US",
                      "label": "The deceased died in the U.S., including its territories.",
                       "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_public_safety_officer",
                "legend": "Deceased public safety officer",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_public_safety_officer",
                      "type": "radio",
                      "name": "Deceased public safety officer",
                      "label": "The deceased was a public safety officer who died in the line of duty.",
                       "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_miner",
                "legend": "Deceased miner",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_miner",
                      "type": "radio",
                      "name": "Deceased miner",
                      "label": "The deceased worked in the coal mining industry and their death was due to pneumoconiosis (black lung disease).",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            },
            {
              "fieldset": {
                "criteriaKey": "deceased_american_indian",
                "legend": "Deceased American Indian",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_american_indian",
                      "type": "radio",
                      "name": "Deceased American Indian",
                      "label": "Was the person who died a member of a federally recognized American Indian Tribe or an Alaska Native?",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "FALSE",
                      "childDependencyOption": ""
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": {}
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "section": {
          "heading": "Final Questions",
          "description": "",
          "fieldsets": [
            {
              "fieldset": {
                "criteriaKey": "deceased_served_in_active_military",
                "legend": "Deceased served in active military",
                "required": "FALSE",
                "hint": "",
                "inputs": [
                  {
                    "inputCriteria": {
                      "id": "deceased_served_in_active_military",
                      "type": "radio",
                      "name": "Deceased served in active military",
                      "label": "Did the person who died serve in the active military, naval, or air service?",
                      "values": [
                        {
                          "option": "Yes",
                          "value": "Yes"
                        },
                        {
                          "option": "No",
                          "value": "No"
                        }
                      ],
                      "hasChild": "TRUE",
                      "childDependencyOption": "TRUE"
                    }
                  }
                ],
                "children": [
                  {
                    "fieldsets": [
                      {
                        "fieldset": {
                          "criteriaKey": "deceased_service_status",
                          "legend": "Deceased service status",
                          "required": "FALSE",
                          "hint": "",
                          "inputs": [
                            {
                              "inputCriteria": {
                                "id": "deceased_service_status",
                                "type": "select",
                                "name": "Deceased service status",
                                "label": "The service status of the deceased is",
                                "values": [
                                  {
                                    "option": "-Select-",
                                    "value": "-Select-"
                                  },
                                  {
                                    "option": "an active-duty service member",
                                    "value": "an active-duty service member"
                                  },
                                  {
                                    "option": "discharged under conditions other than dishonorable",
                                    "value": "discharged under conditions other than dishonorable"
                                  },
                                  {
                                    "option": "retired from the service",
                                    "value": "retired from the service"
                                  },
                                  {
                                    "option": "a member of the National Guard/Reserve",
                                    "value": "a member of the National Guard/Reserve"
                                  }
                                ],
                                "hasChild": "FALSE",
                                "childDependencyOption": ""
                              }
                            }
                          ],
                          "children": [
                            {
                              "fieldsets": {}
                            }
                          ]
                        }
                      },
                      {
                        "fieldset": {
                          "criteriaKey": "deceased_death_circumstance",
                          "legend": "Deceased death circumstance",
                          "required": "FALSE",
                          "hint": "",
                          "inputs": [
                            {
                              "inputCriteria": {
                                "id": "deceased_death_circumstance",
                                "type": "select",
                                "name": "Deceased death circumstance",
                                "label": "One of the following circumstances apply to the deceased:",
                                "values": [
                                  {
                                    "option": "-Select-",
                                    "value": "-Select-"
                                  },
                                  {
                                    "option": "died while on active duty",
                                    "value": "died while on active duty"
                                  },
                                  {
                                    "option": "died while on inactive-duty training",
                                    "value": "died while on inactive-duty training"
                                  },
                                  {
                                    "option": "died as a result of a service-connected disability/illness",
                                    "value": "died as a result of a service-connected disability/illness"
                                  },
                                  {
                                    "option": "died while receiving/traveling to VA care",
                                    "value": "died while receiving/traveling to VA care"
                                  },
                                  {
                                    "option": "died while receiving/eligible for VA compensation",
                                    "value": "died while receiving/eligible for VA compensation"
                                  }
                                ],
                                "hasChild": "FALSE",
                                "childDependencyOption": ""
                              }
                            }
                          ],
                          "children": [
                            {
                              "fieldsets": {}
                            }
                          ]
                        }
                      },
                      {
                        "fieldset": {
                          "criteriaKey": "deceased_grave_headstone",
                          "legend": "Deceased grave headstone",
                          "required": "FALSE",
                          "hint": "",
                          "inputs": [
                            {
                              "inputCriteria": {
                                "id": "deceased_grave_headstone",
                                "type": "radio",
                                "name": "Deceased grave headstone",
                                "label": "The deceased is buried in an unmarked grave, or their grave is marked with a privately purchased headstone.",
                                "values": [
                                  {
                                    "option": "Yes",
                                    "value": "Yes",
                                    "checked": false
                                  },
                                  {
                                    "option": "No",
                                    "value": "No",
                                    "checked": false
                                  }
                                ],
                                "hasChild": "FALSE",
                                "childDependencyOption": ""
                              }
                            }
                          ],
                          "children": [
                            {
                              "fieldsets": {}
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    "relatedLifeEvents": [
      "retirement",
      "disability"
    ]
  },
  "benefits": [
    {
      "benefit": {
        "title": "Test Likely Eligible Benefit",
        "headline": "Test Likely Eligible Criteria",
        "summary": "User will meet all these eligibility criteria",
        "eligibility": [
          {
            "criteriaKey": "applicant_relation",
            "label": "The applicants relationship is parent.",
            "acceptableValue": [
              "parent"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_marital_status",
            "label": "The applicant is married",
            "acceptableValue": [
              "married"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_care_for_child",
            "label": "Applicant does care for a child",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_paid_funeral_expenses",
            "label": "Applicant paid for the funeral expenses.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_funeral_reimbursment",
            "label": "Applicant funeral reimbursement",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_citizen_status",
            "label": "Applicant is a citizen.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          }
        ],
        "tags": [
          "test"
        ],
        "lifeEvents": [
          "Death of a loved one"
        ],
        "agency": {
          "title": "TEST",
          "summary": "This is a test.",
          "lede": ""
        },
        "sourceLink": "https://www.google.com",
        "sourceIsEnglish": "TRUE"
      }
    },
    {
      "benefit": {
        "title": "Test Potentially Eligible Benefit",
        "headline": "Test Potentially Eligible Criteria",
        "summary": "User will meet some of these eligibility criteria",
        "eligibility": [
          {
            "criteriaKey": "applicant_relation",
            "label": "The applicants relationship is parent.",
            "acceptableValue": [
              "parent"
            ],
            "isEligible": false
          },
          {
            "criteriaKey": "applicant_marital_status",
            "label": "The applicant is married",
            "acceptableValue": [
              "married"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_care_for_child",
            "label": "Applicant does care for a child",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_paid_funeral_expenses",
            "label": "Applicant paid for the funeral expenses.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_funeral_reimbursment",
            "label": "Applicant funeral reimbursement",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_citizen_status",
            "label": "Applicant is a citizen.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          }
        ],
        "tags": [
          "test"
        ],
        "lifeEvents": [
          "Death of a loved one"
        ],
        "agency": {
          "title": "TEST",
          "summary": "This is a test.",
          "lede": ""
        },
        "sourceLink": "https://www.google.com",
        "sourceIsEnglish": "TRUE"
      }
    },
    {
      "benefit": {
        "title": "Test More Information Needed Benefit",
        "headline": "Test More Information Needed Criteria",
        "summary": "User will have some undefined values from not having completed enough criteria inputs related to the criteria.",
        "eligibility": [
          {
            "criteriaKey": "applicant_relation",
            "label": "The applicants relationship is parent.",
            "acceptableValue": [
              "parent"
            ],
            "isEligible": "undefined"
          },
          {
            "criteriaKey": "applicant_marital_status",
            "label": "The applicant is married",
            "acceptableValue": [
              "married"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_care_for_child",
            "label": "Applicant does care for a child",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_paid_funeral_expenses",
            "label": "Applicant paid for the funeral expenses.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_funeral_reimbursment",
            "label": "Applicant funeral reimbursement",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          },
          {
            "criteriaKey": "applicant_citizen_status",
            "label": "Applicant is a citizen.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": true
          }
        ],
        "tags": [
          "test"
        ],
        "lifeEvents": [
          "Death of a loved one"
        ],
        "agency": {
          "title": "TEST",
          "summary": "This is a test.",
          "lede": ""
        },
        "sourceLink": "https://www.google.com",
        "sourceIsEnglish": "TRUE"
      }
    },
    {
      "benefit": {
        "title": "Test Not Eligible Benefit",
        "headline": "Test Not Eligible Criteria",
        "summary": "User will meet none these eligibility criteria",
        "eligibility": [
          {
            "criteriaKey": "applicant_relation",
            "label": "The applicants relationship is parent.",
            "acceptableValue": [
              "parent"
            ],
            "isEligible": false
          },
          {
            "criteriaKey": "applicant_marital_status",
            "label": "The applicant is married",
            "acceptableValue": [
              "married"
            ],
            "isEligible": false
          },
          {
            "criteriaKey": "applicant_care_for_child",
            "label": "Applicant does care for a child",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": false
          },
          {
            "criteriaKey": "applicant_paid_funeral_expenses",
            "label": "Applicant paid for the funeral expenses.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": false
          },
          {
            "criteriaKey": "applicant_funeral_reimbursment",
            "label": "Applicant funeral reimbursement",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": false
          },
          {
            "criteriaKey": "applicant_citizen_status",
            "label": "Applicant is a citizen.",
            "acceptableValue": [
              "Yes"
            ],
            "isEligible": false
          }
        ],
        "tags": [
          "test"
        ],
        "lifeEvents": [
          "Death of a loved one"
        ],
        "agency": {
          "title": "TEST",
          "summary": "This is a test.",
          "lede": ""
        },
        "sourceLink": "https://www.google.com",
        "sourceIsEnglish": "TRUE"
      }
    }
  ]
}`

export default content
