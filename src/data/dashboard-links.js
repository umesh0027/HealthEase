import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
 
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard/doctor",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscDashboard",
  },
  {
    id: 2,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscAccount",
  },
  {
    id: 3,
    name: "Dashboard",
    path: "/dashboard/patient",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscDashboard",
  },
  {
    id: 4,
    name: "patient Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscAccount",
  },
 
  {
    id: 5,
    name: "Book Appoinments",
    path: "/dashboard/Appoinment-form",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscCalendar",
  },
  {
    id: 6,
    name: "My Appoinments",
    path: "/dashboard/my-Appoinment",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscCalendar",
  },
  // {
  //   id: 7,
  //   name: "Add Patient",
  //   path: "/dashboard/add-patient",
  //   type: ACCOUNT_TYPE.DOCTOR,
  //   icon: "VscAdd",
  // },
  
  {
    id: 7,
    name: "Appoinments",
    path: "/dashboard/Appoinment",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscCalendar",
  },
  {
    id: 8,
    name: "Support",
    path: "/dashboard/support",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscMail",
  },
  {
    id: 9,
    name: "Reports",
    path: "/dashboard/reports",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscNotebook",
  },
  {
    id: 10,
    name: "Dashboard",
    path: "/dashboard/admin-dashboard",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 11,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAccount",
  },
  {
    id: 12,
    name: "Services",
    path: "/dashboard/services",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscHeart",
  },
  {
    id: 13,
    name: "Support",
    path: "/dashboard/supports",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscMail",
  },
  {
    id: 14,
    name: "Blog",
    path: "/dashboard/blogs",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBook",
  },
  {
    id: 15,
    name: "NewsEvent",
    path: "/dashboard/NewsEvent",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscGlobe",
  },
  {
    id: 16,
    name: "settings",
    path: "/dashboard/doctor-settings",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscSettingsGear",
  },
  {
    id: 17,
    name: "settings",
    path: "/dashboard/patient-settings",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscSettingsGear",
  },
  {
    id: 18,
    name: "settings",
    path: "/dashboard/Admin-settings",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscSettingsGear",
  },
  // {
  //   id: 19,
  //   name: "Bill",
  //   path: "/bill/:billId",
  //   type: ACCOUNT_TYPE.PATIENT,
  //   icon: "VscSettingsGear",
  // },
 

 
]
