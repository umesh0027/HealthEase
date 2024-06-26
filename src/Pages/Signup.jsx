// import signupImg from "../assets/Images/signup.webp"
import Template from "../../src/Component/core/Auth/Template"
import NavBar from "../Component/Common/NavBar"

function Signup() {
  return (
<div className="bg-blue-150">
<NavBar/>
<Template
  formType="signup"
     
    />
</div>
  )
}

export default Signup
