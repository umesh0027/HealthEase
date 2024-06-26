// import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assests/WeCare-main/WeCare Img/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className=" min-h-[calc(100vh-3.5rem)]  ">
      {loading ? (
        <div className="spinner">
        </div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-center gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
           
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
         
        </div>
      )}
    </div>
  )
}

export default Template
