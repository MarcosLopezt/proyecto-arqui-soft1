
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='login' element={<LoginPage />}/>
        </Routes>
    </>
  )
}
