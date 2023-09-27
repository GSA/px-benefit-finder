const content = `{
  "data": {
    "lifeEventForm": {
      "id": "death",
      "timeEstimate": "60 minutes",
      "titlePrefix": "",
      "title": "NEW Find federal benefits after the loss of a loved one",
      "summary": "<p>Find government benefits after the loss of a loved one including funeral, housing, and education help.</p>",
      "sectionsEligibilityCriteria": [
        {
          "section": {
            "heading": "About the applicant",
            "description": "<p>About the person looking for benefits</p>",
            "fieldsets": [
              {
                "fieldset": {
                  "criteriaKey": "applicant_date_of_birth",
                  "legend": "Date of birth:",
                  "required": "TRUE",
                  "hint": "Applicant's DOB: 1969/08/15",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_date_of_birth",
                        "type": "Date",
                        "name": "applicant_date_of_birth",
                        "label": "Date of birth",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "default": "",
                            "value": {}
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "applicant_relationship_to_the_deceased",
                  "legend": "Applicant’s relationship to the deceased:",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_relationship_to_the_deceased",
                        "type": "Select",
                        "name": "applicant_relationship_to_the_deceased",
                        "label": "Applicant's relationship to the deceased",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Spouse",
                            "value": "Spouse"
                          },
                          {
                            "option": "Child",
                            "value": "Child"
                          },
                          {
                            "option": "Parent",
                            "value": "Parent"
                          },
                          {
                            "option": "Other family member",
                            "value": "Other family member"
                          },
                          {
                            "option": "Personal or official representative",
                            "value": "Personal or official representative"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "applicant_marital_status",
                  "legend": "Marital Status",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_marital_status",
                        "type": "Select",
                        "name": "applicant_marital_status",
                        "label": "Marital status",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Married",
                            "value": "Married"
                          },
                          {
                            "option": "Unmarried",
                            "value": "Unmarried"
                          },
                          {
                            "option": "Widowed",
                            "value": "Widowed"
                          },
                          {
                            "option": "Divorced",
                            "value": "Divorced"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "applicant_citizen_status",
                  "legend": "Are you a U.S. citizen or eligible non-citizen?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_citizen_status",
                        "type": "Radio",
                        "name": "applicant_citizen_status",
                        "label": "Are you a U.S. citizen or eligible non-citizen?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "applicant_care_for_child",
                  "legend": "Are you caring for a child of the deceased who is disabled or under the age of 16?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_care_for_child",
                        "type": "Radio",
                        "name": "applicant_care_for_child",
                        "label": "Are you caring for a child of someone who is retired, has a disability, or has died, and the child is disabled or under the age of 16?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "applicant_paid_funeral_expenses",
                  "legend": "Did you pay for funeral or burial expenses?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_paid_funeral_expenses",
                        "type": "Radio",
                        "name": "applicant_paid_funeral_expenses",
                        "label": "Did you pay for funeral or burial expenses?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "applicant_funeral_reimbursement",
                  "legend": "Did you pay for funeral or burial expenses?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "applicant_funeral_reimbursement",
                        "type": "Radio",
                        "name": "applicant_funeral_reimbursment",
                        "label": "Did any organization or government agency reimburse you for any funeral or burial expenses?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              }
            ]
          }
        },
        {
          "section": {
            "heading": "About the deceased",
            "description": "<p>About the person who died</p>",
            "fieldsets": [
              {
                "fieldset": {
                  "criteriaKey": "deceased_date_of_death",
                  "legend": "Date of death",
                  "required": "TRUE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_date_of_death",
                        "type": "Date",
                        "name": "deceased_date_of_death",
                        "label": "Date of death",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "default": "",
                            "value": {}
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_date_of_funeral",
                  "legend": "Date of the funeral",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_date_of_funeral",
                        "type": "Date",
                        "name": "deceased_date_of_funeral",
                        "label": "Date of funeral",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "default": "",
                            "value": {}
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_death_location_is_US",
                  "legend": "Did the person die in the U.S.?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_death_location_is_US",
                        "type": "Radio",
                        "name": "deceased_death_location_is_US",
                        "label": "Did the person die in the U.S.?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_paid_into_SS",
                  "legend": "Did the deceased ever work and pay Social Security taxes on their earnings?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_paid_into_SS",
                        "type": "Radio",
                        "name": "deceased_paid_into_SS",
                        "label": "Did the deceased ever work and pay Social Security taxes on their earnings?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_public_safety_officer",
                  "legend": "Was the deceased a public safety officer who died in the line of duty?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_public_safety_officer",
                        "type": "Radio",
                        "name": "deceased_public_safety_officer",
                        "label": "Was the deceased a public safety officer who died in the line of duty?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_miner",
                  "legend": "Did the person work in the coal mines and their death was due to black lung disease (pneumoconiosis)?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_miner",
                        "type": "Radio",
                        "name": "deceased_miner",
                        "label": "Did the person work in the coal mines and their death was due to black lung disease (pneumoconiosis)?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_american_indian",
                  "legend": "Was the deceased a member of a federally recognized American Indian Tribe or Alaska Native?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_american_indian",
                        "type": "Radio",
                        "name": "deceased_american_indian",
                        "label": "Was the deceased a member of a federally recognized American Indian Tribe or Alaska Native?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_died_of_COVID",
                  "legend": "Did the person die of COVID-19?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_died_of_COVID",
                        "type": "Radio",
                        "name": "deceased_died_of_COVID",
                        "label": "Did the person die of COVID-19?",
                        "hasChild": "FALSE",
                        "childDependencyOption": "",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": []
                }
              },
              {
                "fieldset": {
                  "criteriaKey": "deceased_served_in_active_military",
                  "legend": "Did the deceased serve in the active military, naval, or air service?",
                  "required": "FALSE",
                  "hint": "",
                  "inputs": [
                    {
                      "inputCriteria": {
                        "id": "deceased_served_in_active_military",
                        "type": "Radio",
                        "name": "deceased_served_in_active_military",
                        "label": "Did the deceased serve in active military service?",
                        "hasChild": "TRUE",
                        "childDependencyOption": "Yes",
                        "values": [
                          {
                            "option": "Yes",
                            "value": "Yes"
                          },
                          {
                            "option": "No",
                            "value": "No"
                          }
                        ]
                      }
                    }
                  ],
                  "children": [
                    {
                      "fieldsets": [
                        {
                          "fieldset": {
                            "criteriaKey": "deceased_service_status",
                            "legend": "What was the service status of the deceased?",
                            "required": "FALSE",
                            "hint": "",
                            "inputs": [
                              {
                                "inputCriteria": {
                                  "id": "deceased_service_status",
                                  "type": "Select",
                                  "name": "deceased_service_status",
                                  "label": "What was the service status of the deceased?",
                                  "hasChild": "FALSE",
                                  "childDependencyOption": "",
                                  "values": [
                                    {
                                      "option": "Active-duty service member",
                                      "value": "Active-duty service member"
                                    },
                                    {
                                      "option": "Discharged under conditions other than dishonorable",
                                      "value": "Discharged under conditions other than dishonorable"
                                    },
                                    {
                                      "option": "Retired from the service",
                                      "value": "Retired from the service"
                                    },
                                    {
                                      "option": "Member of the National Guard/Reserves",
                                      "value": "Member of the National Guard/Reserves"
                                    }
                                  ]
                                }
                              }
                            ],
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "fieldsets": [
                        {
                          "fieldset": {
                            "criteriaKey": "deceased_military_death_circumstance",
                            "legend": "Which option applies to the deceased?",
                            "required": "FALSE",
                            "hint": "",
                            "inputs": [
                              {
                                "inputCriteria": {
                                  "id": "deceased_military_death_circumstance",
                                  "type": "Radio",
                                  "name": "deceased_military_death_circumstance",
                                  "label": "Which option applies to the deceased?",
                                  "hasChild": "FALSE",
                                  "childDependencyOption": "",
                                  "values": [
                                    {
                                      "option": "Died while on active duty",
                                      "value": "Died while on active duty"
                                    },
                                    {
                                      "option": "Died while on inactive-duty training",
                                      "value": "Died while on inactive-duty training"
                                    },
                                    {
                                      "option": "Died as a result of a service-related disability/illness",
                                      "value": "Died as a result of a service-related disability/illness"
                                    },
                                    {
                                      "option": "Died while receiving/traveling to VA care",
                                      "value": "Died while receiving/traveling to VA care"
                                    },
                                    {
                                      "option": "Died while receiving/eligible for VA compensation",
                                      "value": "Died while receiving/eligible for VA compensation"
                                    }
                                  ]
                                }
                              }
                            ],
                            "children": []
                          }
                        }
                      ]
                    },
                    {
                      "fieldsets": [
                        {
                          "fieldset": {
                            "criteriaKey": "deceased_grave_headstone",
                            "legend": "Is the person buried in a grave with a privately purchased headstone or an unmarked grave?",
                            "required": "FALSE",
                            "hint": "",
                            "inputs": [
                              {
                                "inputCriteria": {
                                  "id": "deceased_grave_headstone",
                                  "type": "Radio",
                                  "name": "deceased_grave_headstone",
                                  "label": "Is the person buried in a grave with a privately purchased headstone or in an unmarked grave?",
                                  "hasChild": "FALSE",
                                  "childDependencyOption": "",
                                  "values": [
                                    {
                                      "option": "Yes",
                                      "value": "Yes"
                                    },
                                    {
                                      "option": "No",
                                      "value": "No"
                                    }
                                  ]
                                }
                              }
                            ],
                            "children": []
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
      ]
    },
    "benefits": [
      {
        "benefit": {
          "title": "Burial benefits",
          "summary": "<p>Burial and transport assistance for the deceased, and travel support for the spouse, children, and immediate family members of the service member.</p>",
          "SourceLink": "https://www.dcms.uscg.mil/Portals/10/CG-1/PSC/PSD/docs/SurvivorsGuide2015.pdf?ver=2017-03-24-132033-397",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Defense (DOD)",
            "summary": "<p>Provides support for qualified spouses, children, and other family members of deceased service members.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty member",
              "acceptableValues": [
                "Active-duty member"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died on active duty",
              "acceptableValues": [
                "Died on active duty"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Applicant's relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Death gratuity",
          "summary": "<p>Tax free payment of $100,000 to eligible survivors of members of the Armed Forces who died while on active duty or while serving in certain reserve statuses.</p>",
          "SourceLink": "https://militarypay.defense.gov/Benefits/Death-Gratuity/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Defense (DOD)",
            "summary": "<p>Provides support for qualified spouses, children, and other family members of deceased service members.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member or member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty or Died while on inactive-duty service training",
              "acceptableValues": [
                "Died while on active duty",
                "Died while on inactive-duty service training"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Burial flag",
          "summary": "<p>A United States flag for the coffin or urn in honor of the military service member.</p>",
          "SourceLink": "https://www.va.gov/burials-memorials/memorial-items/burial-flags/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "The deceased served in the active military"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, discharged under conditions other than dishonorable, or member of the National Guard/Reserves ",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Annuity for Certain Military Surviving Spouses",
          "summary": "<p>Financial support for surviving spouses of members of the uniformed services.</p>",
          "SourceLink": "https://militarypay.defense.gov/Benefits/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Defense (DOD)",
            "summary": "<p>Provides support for qualified spouses, children, and other family members of deceased service members.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_date_of_death",
              "label": "Deceased died before 1978",
              "acceptableValues": [
                "<01-01-1978"
              ]
            },
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "You served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: retired from the service",
              "acceptableValues": [
                "Retired from the service"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse",
              "acceptableValues": [
                "Spouse"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Burial in VA national cemetery",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->Veterans, service members, and some family members may be eligible for burial in VA national cemeteries.</p>",
          "SourceLink": "https://www.va.gov/burials-memorials/eligibility/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, discharged under conditions other than dishonorable, or member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty, died as a result of a service-related disability/illness, died while receiving/traveling to VA care, or died while receiving/eligible for VA compensation",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness",
                "Died while receiving/traveling to VA care",
                "Died while receiving/eligible for VA compensation"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Civilian Health and Medical Program of the VA (CHAMPVA) for child",
          "summary": "<p>Health insurance for dependents and surviving spouses covering some health care services and supplies.</p>",
          "SourceLink": "https://www.va.gov/health-care/family-caregiver-benefits/champva/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member or discharged under conditions other than dishonorable",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty or died as a result of a service-related disability/illness",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are under 18 years",
              "acceptableValues": [
                "<18years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is: unmarried ",
              "acceptableValues": [
                "Unmarried"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: child",
              "acceptableValues": [
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "COVID-19 funeral assistance",
          "summary": "<p>Financial assistance for burial and funeral costs for someone who died of COVID-19. To be eligible, you were not reimbursed from an organization or agency.</p>",
          "SourceLink": "https://www.fema.gov/disasters/coronavirus/economic/funeral-assistance",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": " Federal Emergency Management Agency (FEMA)",
            "summary": "<p>Federal Emergency Management Agency (FEMA) offers support to people during natural disasters and national emergencies, including housing and funeral assistance.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_died_of_COVID",
              "label": "The deceased died due to COVID-19",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_death_location_is_US",
              "label": "The deceased died in the U.S.",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_date_of_death",
              "label": "The deceased died after May 20th, 2020",
              "acceptableValues": [
                ">01-20-2020 (died after May 20th, 2020)"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a U.S. citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_paid_funeral_expenses",
              "label": "You paid for funeral or burial expenses and were not reimbursed",
              "acceptableValues": [
                "Yes"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Dependency and Indemnity Compensation (DIC) for child",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->Tax-free financial assistance to surviving children or family members of service members and veterans.</p>",
          "SourceLink": "https://www.va.gov/disability/dependency-indemnity-compensation/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "Did the deceased serve in the active military, naval, or air service?",
              "acceptableValues": [
                "You served in the active military"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member or discharged under conditions other than dishonorable",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty, died as a result of a service-related disability/illness, or died while receiving/eligible for VA compensation",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness",
                "Died while receiving/eligible for VA compensation"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are under 18 years",
              "acceptableValues": [
                "<18years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is: unmarried",
              "acceptableValues": [
                "Unmarried"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: child",
              "acceptableValues": [
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Dependency and Indemnity Compensation (DIC) for parent",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->Tax-free financial assistance to surviving parents or family members of service members and veterans.</p>",
          "SourceLink": "https://www.va.gov/disability/dependency-indemnity-compensation/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member or discharged under conditions other than dishonorable",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty, died as a result of a service-related disability/illness, or died while receiving/eligible for VA compensation",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness",
                "Died while receiving/eligible for VA compensation"
              ]
            },
            {
              "criteriaKey": "applicant_income",
              "label": "You have limited income and resources",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: parent",
              "acceptableValues": [
                "Parent"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Dependency and Indemnity Compensation (DIC) for spouse",
          "summary": "<p>Tax-free financial assistance to surviving spouses or family members of service members or veterans.</p>",
          "SourceLink": "https://www.va.gov/disability/dependency-indemnity-compensation/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "Did the deceased serve in the active military, naval, or air service?",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "What was the service status of the deceased?",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "Which option applies to the deceased?",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness",
                "Died while receiving/eligible for VA compensation"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Marital status",
              "acceptableValues": [
                "Unmarried",
                "Widowed"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Applicant's relationship to the deceased:",
              "acceptableValues": [
                "Spouse"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Education benefits (GI Bill) for survivors",
          "summary": "<p>VA education benefits or job training for dependents and survivors of a veteran.</p>",
          "SourceLink": "https://www.va.gov/education/survivor-dependent-benefits/",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: Active-duty service member or discharged under conditions other than dishonorable",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty or died as a result of a service-related disability/illness",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness"
              ]
            },
            {
              "criteriaKey": "applicant_high-school_diploma",
              "label": "You have a high school diploma or GED certificate",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse or child",
              "acceptableValues": [
                "Spouse",
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Financial Assistance and Social Services (FASS)",
          "summary": "<p>Assistance with burial expenses of deceased indigent Indians who do not have resources for funeral expenses.</p>",
          "SourceLink": "https://www.bia.gov/bia/ois/dhs/financial-assistance",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Department of Interior (DOI) - Indian Affairs",
            "summary": "<p>The Bureau of Indian Affairs enhances the quality of life and protects and improves the trust assets of American Indians, Indian tribes, and Alaska Natives.</p>",
            "lede": "<p>The Bureau of Indian Affairs enhances the quality of life and protects and improves the trust assets of American Indians, Indian tribes, and Alaska Natives.</p>"
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_american_indian",
              "label": "The deceased was a member of a federally recognized American Indian Tribe or an Alaska Native.",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_income",
              "label": "You have limited income and resources",
              "acceptableValues": [
                "Yes"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Home loan program for survivors",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->VA-backed home loan to surviving spouses of veterans.</p>",
          "SourceLink": "https://www.va.gov/housing-assistance/home-loans/surviving-spouse/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is:",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty, died as a result of a service-related disability/illness, Died while receiving/traveling to VA care, or died while receiving/eligible for VA compensation",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness",
                "Died while receiving/traveling to VA care",
                "Died while receiving/eligible for VA compensation"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is widowed",
              "acceptableValues": [
                "Widowed"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse",
              "acceptableValues": [
                "Spouse"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Life insurance for survivors of veterans",
          "summary": "<p>Payment from a veteran's or service member's life insurance policy.</p>",
          "SourceLink": "https://www.benefits.va.gov/INSURANCE/sglivgli.asp",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, discharged under conditions other than dishonorable, retired from the service, or member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable",
                "Retired from the service",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Lump-sum death benefit",
          "summary": "<p>Financial assistance of $255 to surviving spouses of a deceased person who qualified for Social Security benefits.</p>",
          "SourceLink": "https://www.ssa.gov/benefits/survivors/ifyou.html#h7",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "The deceased worked and paid Social Security taxes",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_date_of_death",
              "label": "The deceased died within the last two years",
              "acceptableValues": [
                "<2years (the deceased died within the last two years)"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a U.S. citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse or child",
              "acceptableValues": [
                "Spouse",
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Presidential Memorial Certificate",
          "summary": "<p>An engraved Presidential Memorial Certificate (PMC) signed by the current president honoring the military service of a veteran or reservist.</p>",
          "SourceLink": "https://www.va.gov/burials-memorials/memorial-items/presidential-memorial-certificates/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, discharged under conditions other than dishonorable, or member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty, died as a result of a service-related disability/illness, died while receiving/traveling to VA care, or died while receiving/eligible for VA compensation",
              "acceptableValues": [
                "Died while on active duty",
                "Died as a result of a service-related disability/illness",
                "Died while receiving/traveling to VA care",
                "Died while receiving/eligible for VA compensation"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Public Safety Officers' Death Benefits",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->A one-time benefit for survivors of law enforcement officers, firefighters, and other first responders whose deaths were the result of an injury sustained in the line of duty.</p>",
          "SourceLink": "https://psob.bja.ojp.gov/PSOB_FactSheet2019.pdf",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Justice (DOJ)",
            "summary": "<p>Offers financial and educational support to help families of fallen public safety officers.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_public_safety_officer",
              "label": "The deceased was a public safety officer who died in the line of duty",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Public Safety Officers' Educational Assistance Program",
          "summary": "<p>Financial assistance for higher education to spouses and children of police, fire, and emergency public safety officers killed in the line of duty.</p>",
          "SourceLink": "https://psob.bja.ojp.gov/PSOB_Education2018.pdf",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Justice (DOJ)",
            "summary": "<p>Offers financial and educational support to help families of fallen public safety officers.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_public_safety_officer",
              "label": "The deceased was a public safety officer who died in the line of duty",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse or child",
              "acceptableValues": [
                "Spouse",
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivor benefit plan",
          "summary": "<p>Up to 55% of a service member's retired pay for survivors of active duty service members and some retired and reserve members.</p>",
          "SourceLink": "https://militarypay.defense.gov/Benefits/Survivor-Benefit-Program/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Defense (DOD)",
            "summary": "<p>Provides support for qualified spouses, children, and other family members of deceased service members.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, retired from the service, or member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Retired from the service",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died while on active duty or died while on inactive-duty service training",
              "acceptableValues": [
                "Died while on active duty",
                "Died while on inactive-duty service training"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse or child",
              "acceptableValues": [
                "Spouse",
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors benefits for child",
          "summary": "<p>Social Security survivors benefits paid to a child, stepchild, grandchild, or adopted child of eligible workers.</p>",
          "SourceLink": "https://www.ssa.gov/benefits/survivors/ifyou.html#h4",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "The deceased worked and paid Social Security taxes",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are under 18 years",
              "acceptableValues": [
                "<18years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is unmarried",
              "acceptableValues": [
                "Unmarried"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a U.S. citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Applicant's relationship to the deceased is: child",
              "acceptableValues": [
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors benefits for child with disabilities",
          "summary": "<p>Social Security survivors benefits to a child, stepchild, grandchild, or adopted child with disabilities of eligible workers.</p>",
          "SourceLink": "https://www.ssa.gov/benefits/survivors/ifyou.html#h4",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "The deceased worked and paid Social Security taxes",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are under 18 years",
              "acceptableValues": [
                "<18years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is unmarried",
              "acceptableValues": [
                "Unmarried"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a U.S. citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_disability",
              "label": "You have a disability",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_ability_to_work",
              "label": "You are unable to work for a year or more because of a disability or your disability is expected to result in death",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: child",
              "acceptableValues": [
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors benefits for mothers/fathers",
          "summary": "<p>Social Security survivors benefits to the person providing care for the child of a deceased worker.</p>",
          "SourceLink": "https://www.ssa.gov/forms/ssa-5.html",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "The deceased worked and paid Social Security taxes",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is unmarried or widowed",
              "acceptableValues": [
                "Unmarried",
                "Widowed"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a US citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_care_for_child",
              "label": "You are caring for a child of someone who is retired, has a disability, or has died, and the child is disabled or under the age of 16",
              "acceptableValues": [
                "Yes"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors benefits for parents",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->Social Security survivors benefits to parents of eligible workers.</p>",
          "SourceLink": "https://www.ssa.gov/benefits/survivors/ifyou.html#h5",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "The deceased worked and paid Social Security taxes",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are over 62 years",
              "acceptableValues": [
                ">=62years"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a US citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: parent",
              "acceptableValues": [
                "Parent"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors benefits for spouse",
          "summary": "<p>Social Security survivors benefits to surviving spouses and certain divorced spouses of eligible workers.</p>",
          "SourceLink": "https://www.ssa.gov/benefits/survivors/ifyou.html#h2",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "The deceased worked and paid Social Security taxes",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are over 60 years",
              "acceptableValues": [
                ">=60years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is widowed or divorced",
              "acceptableValues": [
                "Widowed",
                "Divorced"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a US citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse",
              "acceptableValues": [
                "Spouse"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors benefits for spouse with disabilities",
          "summary": "<p>Social Security survivors benefits to surviving spouses and certain divorced spouses with disabilities of eligible workers.</p>",
          "SourceLink": "https://www.ssa.gov/benefits/survivors/ifyou.html#h2",
          "SourceIsEnglish": "FALSE",
          "agency": {
            "title": "Social Security Administration (SSA)",
            "summary": "<p>Administers Social Security, as well as disability insurance, and other benefits.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_paid_into_SS",
              "label": "Did the deceased ever work and pay Social Security taxes on their earnings?",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are over 50 years",
              "acceptableValues": [
                ">=50years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is widowed or divorced",
              "acceptableValues": [
                "Widowed",
                "Divorced"
              ]
            },
            {
              "criteriaKey": "applicant_citizen_status",
              "label": "You are a US citizen or eligible non-citizen",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_disability",
              "label": "You have a disability",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_ability_to_work",
              "label": "You are unable to work for a year or more because of a disability or your disability is expected to result in death",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse",
              "acceptableValues": [
                "Spouse"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors pension for child",
          "summary": "<p>Monthly payments to qualified unmarried dependent children of deceased wartime veterans.</p>",
          "SourceLink": "https://www.va.gov/pension/survivors-pension/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "You served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "Your service status is: discharged for conditions other than dishonorable",
              "acceptableValues": [
                "Discharged for conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are under 18 years",
              "acceptableValues": [
                "<18years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is unmarried",
              "acceptableValues": [
                "Unmarried"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: child",
              "acceptableValues": [
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors pension for child with disabilities",
          "summary": "<p>Monthly payments to qualified unmarried dependent children with disabilities of wartime veterans with certain income and net worth limits.</p>",
          "SourceLink": "https://www.va.gov/pension/survivors-pension/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: discharged for conditions other than dishonorable",
              "acceptableValues": [
                "Discharged for conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "applicant_date_of_birth",
              "label": "You are under 18 years",
              "acceptableValues": [
                ">18years"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is unmarried",
              "acceptableValues": [
                "Unmarried"
              ]
            },
            {
              "criteriaKey": "applicant_disability",
              "label": "You have a disability",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: child",
              "acceptableValues": [
                "Child"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Survivors pension for spouse",
          "summary": "<p>Monthly payments to surviving spouses of wartime veterans with certain income and net worth limits.</p>",
          "SourceLink": "https://www.va.gov/pension/survivors-pension/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: discharged for conditions other than dishonorable",
              "acceptableValues": [
                "Discharged for conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "applicant_marital_status",
              "label": "Your marital status is unmarried or widowed",
              "acceptableValues": [
                "Unmarried",
                "Widowed"
              ]
            },
            {
              "criteriaKey": "applicant_income",
              "label": "You have limited income and resources",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse",
              "acceptableValues": [
                "Spouse"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Veterans burial allowance",
          "summary": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->Assistance with burial, funeral, and transportation costs of a deceased veteran.</p>",
          "SourceLink": "https://www.va.gov/burials-memorials/veterans-burial-allowance/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_date_of_death",
              "label": "The deceased died within the last two years",
              "acceptableValues": [
                "<2years (The deceased died within the last two years.)"
              ]
            },
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: discharged for conditions other than dishonorable",
              "acceptableValues": [
                "Discharged for conditions other than dishonorable"
              ]
            },
            {
              "criteriaKey": "deceased_military_death_circumstance",
              "label": "One of the following applies to the deceased: died as a result of a service-related disability/illness, died while receiving/traveling to VA care, or died while receiving/eligible for VA compensation",
              "acceptableValues": [
                "Died as a result of a service-related disability/illness",
                "Died while receiving/traveling to VA care",
                "Died while receiving/eligible for VA compensation"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            },
            {
              "criteriaKey": "applicant_paid_funeral_expenses",
              "label": "You paid for funeral or burial expenses",
              "acceptableValues": [
                "Yes"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Veterans headstone and grave marker",
          "summary": "<p>A headstone, grave or niche marker, or medallion to honor a veteran, service member, or eligible family member.</p>",
          "SourceLink": "https://www.va.gov/burials-memorials/memorial-items/headstones-markers-medallions/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, discharged under conditions other than dishonorable, or member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "deceased_grave_headstone",
              "label": "The person is buried in a grave with a privately purchased headstone or an unmarked grave",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Veterans medallion",
          "summary": "<p>A headstone medallion, grave marker, and Presidential Memorial Certificate for eligible veterans buried in a private cemetery.</p>",
          "SourceLink": "https://www.va.gov/burials-memorials/memorial-items/headstones-markers-medallions/",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Veterans Affairs Department (VA)",
            "summary": "<p>Provides a wide range of benefits in support of veterans, service members, and their families.</p>",
            "lede": ""
          },
          "tags": [
            "Death of a loved one"
          ],
          "eligibility": [
            {
              "criteriaKey": "deceased_served_in_active_military",
              "label": "The deceased served in the active military",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "deceased_service_status",
              "label": "The service status of the deceased is: active-duty service member, discharged under conditions other than dishonorable, or a member of the National Guard/Reserves",
              "acceptableValues": [
                "Active-duty service member",
                "Discharged under conditions other than dishonorable",
                "Member of the National Guard/Reserves"
              ]
            },
            {
              "criteriaKey": "deceased_grave_headstone",
              "label": "The person is buried in a grave with a privately purchased headstone or an unmarked grave",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_relationship_to_the_deceased",
              "label": "Your relationship to the deceased is: spouse, child, parent, or other family member",
              "acceptableValues": [
                "Spouse",
                "Child",
                "Parent",
                "Other family member"
              ]
            }
          ]
        }
      },
      {
        "benefit": {
          "title": "Coal Mine Workers' Compensation (black lung benefits)",
          "summary": "<p>Compensation to coal miners who were totally disabled by black lung disease (pneumoconiosis) or surviving spouses of miners whose deaths are attributable to this disease.&nbsp;</p><p>Also provides medical coverage for treatment of related lung diseases.</p>",
          "SourceLink": "https://www.dol.gov/agencies/owcp/dcmwc/filing_guide_miner",
          "SourceIsEnglish": "TRUE",
          "agency": {
            "title": "Department of Labor (DOL)",
            "summary": "<p>Promotes and improves the welfare, working conditions, opportunities, benefits and rights of wage earners, job seekers, and retirees of the United States.</p>",
            "lede": "<p><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}-->Promotes and improves the welfare, working conditions, opportunities, benefits and rights of wage earners, job seekers, and retirees of the United States.</p>"
          },
          "tags": [
            "Disability benefits",
            "Retirement"
          ],
          "eligibility": [
            {
              "criteriaKey": "applicant_disability",
              "label": "Do you have a physical or mental impairment (including an emotional or learning disability)?",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_ability_to_work",
              "label": "You are unable to work for a year or more because of a disability or your disability is expected to result in death",
              "acceptableValues": [
                "Yes"
              ]
            },
            {
              "criteriaKey": "applicant_miner",
              "label": "You worked in the coal mining industry and suffer from an illness caused by black lung disease (pneumoconiosis)",
              "acceptableValues": [
                "Yes"
              ]
            }
          ]
        }
      }
    ]
  },
  "method": "GET",
  "status": 200
}
`

export default content
