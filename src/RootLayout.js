import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <div className='container'>
        <Outlet/>
        </div>
        </div>
  )
}

export default RootLayout