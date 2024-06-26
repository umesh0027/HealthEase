// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { sidebarLinks } from "../../../../data/dashboard-links"
// import { logout } from "../../../../services/operations/authAPI"
// import ConfirmationModal from "../../../Common/ConfirmationModal"
// import SidebarLink from "../SidebarLink"
// import dashboardImg from "../../../assests/WeCare-main/WeCare Img/dashboardlogo.png"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (

//     <>
//       <div className="flex h-[calc(100vh)] min-w-[220px] flex-col bg-blue-250">

//        <div className=" relative h-[300px] bg-white text-center flex flex-col items-center sidebarbgImg ">
       
//        <div className="mt-10 ">
//         <img src={dashboardImg} alt="logo" width={50} height={50} className="" />
//        </div>
//         <div className=" text-left mt-4  ">

//         <h1 className="text-2xl text-center text-blue-800 font-semibold">Hii!</h1>
//         <h1 className="text-xl text-center text-white font-semibold">{user?.firstName + " " + user?.lastName}</h1>
//         <h1 className="text-3xl text-center text-blue-800 font-semibold">Welcome to</h1>
//         <h1  className="text-3xl text-center text-blue-800 font-semibold">Health Ease</h1>
//         </div>
//        </div>
//         <div className="flex flex-col mt-6 ">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//           <div className="mx-auto mt-2 mb-2 h-[1px] w-10/12 bg-blue-150" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-800"
//           >
//             <div className="flex items-center gap-x-2 ml-5">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//         </div>
       
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }




import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { FaAlignJustify} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sidebarLinks } from "../../../../data/dashboard-links"
import { logout } from "../../../../services/operations/authAPI"
import ConfirmationModal from "../../../Common/ConfirmationModal"
import SidebarLink from "../SidebarLink"
import dashboardImg from "../../../assests/WeCare-main/WeCare Img/dashboardlogo.png"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 block md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaAlignJustify className="text-2xl text-white" />
      </button>
      <div
        className={`fixed md:static top-0 left-0 h-full w-[220px] bg-blue-250 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="relative h-[300px] bg-white text-center flex flex-col items-center sidebarbgImg">
          <div className="mt-10">
            <img src={dashboardImg} alt="logo" width={50} height={50} />
          </div>
          <div className="text-left mt-4">
            <h1 className="text-2xl text-center text-blue-800 font-semibold">Hii!</h1>
            <h1 className="text-xl text-center text-white font-semibold">
              {user?.firstName + " " + user?.lastName}
            </h1>
            <h1 className="text-3xl text-center text-blue-800 font-semibold">Welcome to</h1>
            <h1 className="text-3xl text-center text-blue-800 font-semibold">Health Ease</h1>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
              />
            )
          })}
          <div className="mx-auto mt-2 mb-2 h-[1px] w-10/12 bg-blue-150" />
          <div className="flex flex-col">
            {/* <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
            /> */}
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-800"
            >
              <div className="flex items-center gap-x-2 ml-5">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
