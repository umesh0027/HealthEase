


import React from 'react'
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileDropdown from "../../../Component/core/Auth/ProfileDropdown"
import NavBarImg from "../../../assests/WeCare-main/WeCare Img/Health EaseLogo.png"

const DashboardHeader = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-[100px] bg-blue-250 p-4 md:p-0">
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <NavLink to="/">
          <img src={NavBarImg} alt="Health Ease" className="h-12 md:h-16" />
        </NavLink>
      </div>
      <h1 className="text-richblack-600 lg:text-3xl md:text-xl text-center">
        Welcome to Health Ease
         {/* {user?.accountType}{"'s"} */}
      </h1>
      <div className="mt-4 md:mt-0 mr-0 md:mr-4 ">
        {token !== null && <ProfileDropdown />}
      </div>
    </div>
  )
}

export default DashboardHeader
