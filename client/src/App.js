import React from 'react'
import Router from './Router'

import { MyProvider } from './context/AppStateProvider'

const App = () => (
  <MyProvider>
    <Router />
  </MyProvider>
)

export default App
