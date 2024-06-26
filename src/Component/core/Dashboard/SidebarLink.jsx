// import * as Icons from "react-icons/vsc"
// import { useDispatch } from "react-redux"
// import { NavLink, matchPath, useLocation } from "react-router-dom"



// export default function SidebarLink({ link, iconName }) {
//   const Icon = Icons[iconName]
  
//   const location = useLocation()
//   const dispatch = useDispatch()

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <NavLink  to={link.path}
 
//     className={`relative px-8 py-2 text-sm font-medium ${
//       matchRoute(link.path)
//         ? "bg-blue-200 text-blue-50"
//         : "bg-opacity-0 text-richblack-800"
//     } transition-all duration-200`}
//     >
//       <span
//         className={`absolute left-0 top-0 h-full w-[0.15rem]  ${
//           matchRoute(link.path) ? "opacity-100" : "opacity-0"
//         }`}
//       ></span>
//       <div className="flex items-center gap-x-2 mr-5 text-richblack-800 ">
//         {/* Icon Goes Here */}
//         <Icon className="text-lg ml-5 text-richblack-800" />
//         <span >{link.name}</span>
//       </div>
//     </NavLink>
//   )
// }


import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

export default function SidebarLink({ link, iconName, onClick }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-1 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-blue-200 text-blue-50"
          : "bg-opacity-0 text-richblack-800"
      } transition-all duration-200`}
      onClick={onClick} // Added onClick to handle sidebar close
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2 mr-5 text-richblack-800 ">
        <Icon className="text-lg ml-5 text-richblack-800" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
