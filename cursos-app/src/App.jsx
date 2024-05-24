import React from 'react'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </>
  )
}
