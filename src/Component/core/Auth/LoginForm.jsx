

import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4 p-4 rounded-md bg-blue-250"
    >
      <label className="w-full">
        <p className="mb-1 text-sm leading-5 text-gray-700">
          Email Address <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-input w-full p-2 border border-gray-300 rounded-md"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-sm leading-5 text-gray-700">
          Password <sup className="text-pink-500">*</sup>
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
          className="absolute right-3 top-[32px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 text-xs text-blue-500">
            Forgot Password?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-lg bg-blue-500 py-2 px-4 font-medium text-white hover:bg-blue-600"
      >
        Sign In
      </button>
      <div className="mt-2 text-center">
        <p className="text-gray-700">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
