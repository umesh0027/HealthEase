import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../../utils/dateFormatter"
import IconBtn from "../../../Common/IconBtn"
import DashboardHeader from "../DashboardHeader";

export default function AdminProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
 
  return (
    <>
    <DashboardHeader/>
 
    <div className=" mt-10 mx-auto w-11/12 max-w-[1000px] rounded-md">
    <h1 className="mb-14 text-3xl font-medium text-white ml-8 "> 
    
   My Profile
      </h1>
      
      <div className="flex items-center justify-between rounded-md bg-blue-250 p-8 px-12 ">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[50px] lg:w-[78px] rounded-full object-cover ml-[-25px]"
          />
          <div className="space-y-5">
            <p className="text-lg font-semibold text-richblack-800">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-600 ">{user?.email}</p>
          </div>
        </div>
      <div className="">
      <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/Admin-settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      </div>

      
      <div className="my-10 flex flex-col gap-y-10 rounded-md  bg-blue-250 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-800">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/Admin-settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-600"
              : "text-richblack-600"
          } text-[16px] font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md  bg-blue-250 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-900">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/Admin-settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between gap-x-5">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-xl text-richblack-800">First Name</p>
              <p className="text-sm font-medium text-richblack-600">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xl text-richblack-800">Email</p>
              <p className="text-sm font-medium text-richblack-600">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xl text-richblack-800">Gender</p>
              <p className="text-sm font-medium text-richblack-600">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-xl  text-richblack-800">Last Name</p>
              <p className="text-sm font-medium text-richblack-600">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xl  text-richblack-800">Contact Number</p>
              <p className="text-sm font-medium text-richblack-600">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
           
            <div>
              <p className="mb-2 text-xl  text-richblack-800">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-600">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
