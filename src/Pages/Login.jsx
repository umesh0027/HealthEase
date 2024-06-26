import loginImg from "../assests/WeCare-main/WeCare Img/loginimgg.jpg"
import Template from "../../src/Component/core/Auth/Template"
import NavBar from "../Component/Common/NavBar"

function Login() {
  return (
  <div className="bg-blue-150">
      <NavBar/>
      <Template
     
      formType="login"
    />
  </div>
  )
}

export default Login
