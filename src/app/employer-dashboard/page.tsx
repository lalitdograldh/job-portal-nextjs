
import { logoutUserAction } from '@/features/auth/server/auth.actions'
import React from 'react'

const EmployerDashboard = () => {
  return (
    <div>
      <h1>EmployerDashboard</h1>
      <button onClick={logoutUserAction}>Logout</button>
    </div>
  )
}

export default EmployerDashboard