import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// a version of uswds will already be on production
if (process.env.NODE_ENV !== 'production') {
  import('../node_modules/@uswds/uswds/dist/js/uswds.js') // uswds
  import('../node_modules/@uswds/uswds/dist/css/uswds.css') // uswds
  import('../themes/custom/usagov/css/styles.css') // usagov
  import('../build/assets/benefit-finder.min.css') // benefit-finder
}

const root = ReactDOM.createRoot(document.getElementById('benefit-finder'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
