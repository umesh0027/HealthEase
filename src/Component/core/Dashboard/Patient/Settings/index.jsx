import ChangeProfilePicture from "./ChangeProfilePicture"
import {NavLink} from 'react-router-dom';
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import { useSelector } from "react-redux"
import UpdatePassword from "./UpdatePassword"

import DashboardHeader from "../../DashboardHeader";

export default function PattientSettings() {

  const { user } = useSelector((state) => state.profile)

  const { token } = useSelector((state) => state.auth)
  return (
    <>
    <DashboardHeader/>
  
      <div className=" mt-10 mx-auto w-11/12 max-w-[1000px]">
      <h1 className="mb-14 text-3xl font-medium text-white ml-8 mt-5 ">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
      </div>
    </>
  )
}
