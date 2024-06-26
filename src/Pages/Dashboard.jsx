import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../Component/core/Dashboard/Patient/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh)] bg-blue-150">
      <Sidebar />
      
      <div className="h-[calc(100vh)] flex-1 overflow-auto">
        <div className="  ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
