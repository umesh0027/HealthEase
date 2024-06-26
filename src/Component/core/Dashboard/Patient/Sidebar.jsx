



import React, { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../../data/dashboard-links";
import { logout } from "../../../../services/operations/authAPI";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import SidebarLink from "../SidebarLink";
import dashboardImg from "../../../../assests/WeCare-main/WeCare Img/dashboardlogo.png"

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="md:hidden text-black font-bold fixed top-16 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 w-64 h-[100vh]  bg-blue-250 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full border-r-[1px] border-r-blue-500 bg-blue-250  ">
        
          <div className="text-center mb-6 sidebarbgImg py-4">
            <img src={dashboardImg} alt="logo" width={50} height={50} className=" items-center mt-10 mx-auto" />
            <h1 className="text-2xl text-blue-800 font-semibold mt-4">
              Hii!
            </h1>
            <h1 className="text-xl text-white font-semibold">
              {user?.firstName + " " + user?.lastName}
            </h1>
            <h1 className="text-3xl text-blue-800 font-semibold">
              Welcome to
            </h1>
            <h1 className="text-3xl text-blue-800 font-semibold">
              Health Ease
            </h1>
          </div>
          
          <div className="flex flex-col flex-grow">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
          {/* </div> */}

          <div className=" mx-auto mt-2 h-[1px] w-10/12 bg-blue-150" />

          <div className="flex flex-col ">
            {/* <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
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
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
