

import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../Common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PATIENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.PATIENT)
  }

  const tabData = [
    {
      id: 1,
      tabName: "Patient",
      type: ACCOUNT_TYPE.PATIENT,
    },
    {
      id: 2,
      tabName: "Doctor",
      type: ACCOUNT_TYPE.DOCTOR,
    },
  ]

  return (
    <div className="max-w-lg mx-auto p-4">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 bg-blue-250 p-4 rounded-md">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="w-full">
            <p className="mb-1 text-sm text-gray-700">
              First Name <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-input w-full p-2 border border-gray-300 rounded-md pr-10"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-sm text-gray-700">
              Last Name <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-input w-full p-2 border border-gray-300 rounded-md pr-10"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-sm text-gray-700">
            Email Address <sup className="text-pink-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-input w-full p-2 border border-gray-300 rounded-md pr-10"
          />
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-700">
              Create Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-input w-full p-2 border border-gray-300 rounded-md pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-700">
              Confirm Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-input w-full p-2 border border-gray-300 rounded-md pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-lg bg-blue-500 py-2 px-4 font-medium text-white hover:bg-blue-600"
        >
          Create Account
        </button>
        <div className="mt-2 text-center">
          <p className="text-gray-700">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
