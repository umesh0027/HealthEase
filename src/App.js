
import './App.css';

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from './Pages/Home';
import About from "../src/Pages/About"
import Contact from "../src/Pages/Contact"
import Login from "../src/Pages/Login"
import Signup from "../src/Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import DoctorProfile from './Component/core/Dashboard/Doctor/DoctorProfile';
import DoctorSettings from "./Component/core/Dashboard/Doctor/DoctorSettings"
import PattientSettings from './Component/core/Dashboard/Patient/Settings';
import OpenRoute from "../src/Component/core/Auth/OpenRoute"
import UpdatePassword from "./Pages/UpdatePassword"
import VerifyEmail from "./Pages/VerifyEmail"
import ForgotPassword from "./Pages/ForgotPassword"
import PrivateRoute from "../src/Component/core/Auth/PrivateRoute"
import { getUserDetails } from "./services/operations/profileAPI"
import { ACCOUNT_TYPE } from "./utils/constants"
import Services from "./Component/core/Dashboard/Admin/Services"
import PatientDashboard from './Component/core/Dashboard/Patient/PatientDashboard';
import Support from './Component/core/Dashboard/Patient/Support';
import Appoinments from './Component/core/Dashboard/Patient/Appoinments';
import AdminPanelSupport from './Component/core/Dashboard/Admin/AdminPanel';
import AdminBlog from './Component/core/Dashboard/Admin/Blog/Blog';
import PatientProfile from './Component/core/Dashboard/Patient/PatientProfile';
import AdminProfile from './Component/core/Dashboard/Admin/AdminProfile';
import Blog from './Pages/Blog';
import BlogDetails from './Pages/BlogDetails';
import MainNewsEvent from './Component/core/Dashboard/Admin/News/MainNewsEvent';
import NewsDetailsPage from './Pages/NewsDetailsPage';
import AdminDashboard from './Component/core/Dashboard/Admin/AdminDashboard';
import ServicePage from './Pages/Services/Service';
import ServiceDetailsPage from './Pages/Services/ServicesDetails';
import AdminSettings from './Component/core/Dashboard/Admin/AdminSettings';
import DoctorList from './Pages/AllDoctor';
import PatientAppointment from './Component/core/Dashboard/Patient/MyAppointment';
import DoctorAppointments from './Component/core/Dashboard/Doctor/DoctorAppointment';
import PatientReport from './Component/core/Dashboard/Patient/Myreport';
import BillDetails from './Component/core/Dashboard/Patient/Bill';
import Footer from './Component/Common/Footer';


import backgroundImage from "../src/assests/WeCare-main/WeCare Img/bg.png";
import DiseaseCard from "./Component/HomeComponent/DiseaseCard";
import HealthEaseInfo from "./Component/HomeComponent/HealthEaseInfo";
import DiseaseDetailsPage from "./Component/HomeComponent/DiseaseDetailPage";
import DiabetesForm from "./Component/HomeComponent/DiabetesForm";
import HeartDiseaseForm from "./Component/HomeComponent/HeartDiseaseForm";
import ParkinsonsDiseaseForm from "./Component/HomeComponent/ParkinsonsDiseaseForm";
import PneumoniaForm from "./Component/HomeComponent/PneumoniaForm";
import disease1Image from "../src/assests/WeCare-main/WeCare Img/diabetes.jpg";
import disease2Image from "../src/assests/WeCare-main/WeCare Img/heart.jpg";
import disease3Image from "../src/assests/WeCare-main/WeCare Img/parkinson.jpg";
import pneumoniaImage from "../src/assests/WeCare-main/WeCare Img/pneumonia.png";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navs from './Component/HomeComponent/Nav';
import DoctorDashboardProfile from './Component/core/Dashboard/Doctor/DoctorDashboard';
const diseases = [
  {
    id: 1,
    image: disease1Image,
    title: "Diabetes",
    description:
      "Diabetes is a chronic, metabolic disease characterized by elevated levels of blood glucose (or blood sugar).",
    details:
      "Hyperglycaemia, also called raised blood glucose or raised blood sugar, is a common effect of uncontrolled diabetes and over time leads to serious damage to many of the body's systems, especially the nerves and blood vessels. Between 2000 and 2019, there was a 3% increase in age-standardized mortality rates from diabetes. In lower-middle-income countries, the mortality rate due to diabetes increased 13%.",
  },
  {
    id: 2,
    image: disease2Image,
    title: "Heart Disease",
    description:
      "Heart disease, aka cardiovascular disease, is a general term for many types of heart and blood vessel conditions.",
    details:
      "The most important behavioural risk factors of heart disease and stroke are unhealthy diet, physical inactivity, tobacco use and harmful use of alcohol. The effects of behavioural risk factors may show up in individuals as raised blood pressure, raised blood glucose, raised blood lipids, and overweight and obesity. These “intermediate risks factors” can be measured in primary care facilities and indicate an increased risk of heart attack, stroke, heart failure and other complications.",
  },
  {
    id: 3,
    image: disease3Image,
    title: "Parkinson's Disease",
    description:
      "Parkinson's disease is a progressive disorder that affects the nervous system and the body parts controlled by them.",
    details:
      "Parkinson's disease is a progressive disorder that affects the nervous system and the parts of the body controlled by the nerves. Symptoms start slowly. The first symptom may be a barely noticeable tremor in just one hand. Tremors are common, but the disorder also may cause stiffness or slowing of movement. In the early stages of Parkinson's disease, your face may show little or no expression. Your arms may not swing when you walk. Your speech may become soft or slurred. Parkinson's disease symptoms worsen as your condition progresses over time.",
  },
  {
    id: 4,
    image: pneumoniaImage,
    title: "Pneumonia",
    description:
      "Pneumonia is an inflammatory condition of the lung affecting primarily the small air sacs known as alveoli.",
    details:
      "Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus (purulent material), causing cough with phlegm or pus, fever, chills, and difficulty breathing. A variety of organisms, including bacteria, viruses and fungi, can cause pneumonia. Pneumonia can range in seriousness from mild to life-threatening. It is most serious for infants and young children, people older than age 65, and people with health problems or weakened immune systems.",
  },
];

const DiseaseDetailsWrapper = () => {
  const { id } = useParams();
  const disease = diseases.find((d) => d.id === parseInt(id));
  return <DiseaseDetailsPage disease={disease} />;
};
function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [showDiabetesForm, setShowDiabetesForm] = useState(false);
  const [showHeartDiseaseForm, setShowHeartDiseaseForm] = useState(false);
  const [showParkinsonsForm, setShowParkinsonsForm] = useState(false);
  const [showPneumoniaForm, setShowPneumoniaForm] = useState(false);

  const sectionStyle = {
    background: `url(${backgroundImage}) no-repeat center center`,
    backgroundSize: "cover",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const handlePredictNowClick = (diseaseId) => {
    if (diseaseId === 1) {
      setShowDiabetesForm(true);
    } else if (diseaseId === 2) {
      setShowHeartDiseaseForm(true);
    } else if (diseaseId === 3) {
      setShowParkinsonsForm(true);
    } else if (diseaseId === 4) {
      setShowPneumoniaForm(true);
    }
  };
  return (

    
    <div>
    
   
   
   
    <Routes>
     
      <Route  path="/" element={<Home/>}/>
      <Route  path="/about" element={<About/>}/>
      <Route  path="/contact" element={<Contact/>}/>
      <Route  path="/blogs" element={<Blog/>}/>
      <Route  path="/blogs/:id" element={<BlogDetails/>}/>
      <Route path="/news/:id" element={<NewsDetailsPage />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/service/:id" element={<ServiceDetailsPage />} />
      <Route path="/doctors" element={<DoctorList/>} />

 {/* Open Route - for Only Non Logged in User */}
 <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
 <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

        <Route>
        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route
                path="dashboard/services"
                element={<Services />}
              />
              <Route
                path="dashboard/admin-dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="dashboard/blogs"
                element={<AdminBlog
                />}
              />
              <Route
                path="dashboard/supports"
                element={<AdminPanelSupport />}
              />
              <Route
                path="dashboard/NewsEvent"
                element={<MainNewsEvent />}
              />
            </>
          )}
        </Route>

        <Route>
        {user?.accountType === ACCOUNT_TYPE.PATIENT && (
            <>
            <Route path="dashboard/my-profile" element={<PatientProfile />} />
            <Route path="dashboard/reports" element={<PatientReport />} />
            
            <Route path="/bill/:billId" element={BillDetails} />
            </>
          )}
        </Route>
        <Route>
        {user?.accountType === ACCOUNT_TYPE.DOCTOR && (
            <>
            <Route path="dashboard/my-profile" element={<DoctorProfile />} />
            <Route path="dashboard/Appoinment" element={<DoctorAppointments/>} />
            <Route path="dashboard/doctor" element={<DoctorDashboardProfile/>} />
            </>
          )}
        </Route>
        <Route>
        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
            <Route path="dashboard/my-profile" element={<AdminProfile />} />
            </>
          )}
        </Route>


 <Route path="dashboard/patient" element={<PatientDashboard />} />

 <Route path="dashboard/Appoinment-form" element={<Appoinments />} />
 <Route path="dashboard/my-Appoinment" element={<PatientAppointment />} />
 <Route path="dashboard/support" element={<Support />} />

  <Route path="dashboard/patient-settings" element={<PattientSettings/>} />
  
  <Route path="/dashboard/doctor-settings" element={<DoctorSettings />} />
  <Route path="/dashboard/Admin-settings" element={<AdminSettings />} />
 
  

        </Route>


        

{/* <DiseaseApp/> */}


<Route
            path="/disease"
            element={
              <>
              <Navs/>
                <div className="container mx-auto p-4">
                  <section className="text-center" style={sectionStyle}>
                    <h1 className="text-5xl font-bold mb-8 text-center">
                      Welcome to Health Ease Disease Predictor
                    </h1>
                  </section>
                </div>
                <div className="container mx-auto p-4">
                  <HealthEaseInfo />
                  <div className="lg:flex flex-wrap lg:mx-auto  ">
                    {diseases.map((disease) => (
                      <div className="w-1/4 px-4 mb-8" key={disease.id}>
                        <DiseaseCard
                          disease={disease}
                          onPredictNowClick={() =>
                            handlePredictNowClick(disease.id)
                          }
                          learnMoreLink={`/disease-details/${disease.id}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Footer />
                {showDiabetesForm && <Navigate to="/diabetes-form" />}
                {showHeartDiseaseForm && <Navigate to="/heart-disease-form" />}
                {showParkinsonsForm && (
                  <Navigate to="/parkinsons-disease-form" />
                )}
                {showPneumoniaForm && <Navigate to="/pneumonia-form" />}
              </>
            }
          />
          <Route
            path="/disease-details/:id"
            element={<DiseaseDetailsWrapper />}
          />
          <Route path="/diabetes-form" element={<DiabetesForm />} />
          <Route path="/heart-disease-form" element={<HeartDiseaseForm />} />
          <Route
            path="/parkinsons-disease-form"
            element={<ParkinsonsDiseaseForm />}
          />
          <Route path="/pneumonia-form" element={<PneumoniaForm />} />
        
    </Routes>

    </div>
  );
}

export default App;
