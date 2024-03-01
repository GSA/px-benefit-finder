import React from 'react'
import ReactDOM from 'react-dom'
import axe from '@axe-core/react'

const config = {
  rules: [
    {
      id: 'skip-link',
      enabled: true,
    },
  ],
  disableDeduplicate: true,
}

const axeTester = async () => {
  try {
    await axe(React, ReactDOM, 1000, config)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Axe test failed', error)
  }
}

export default axeTester
