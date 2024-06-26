// Importing necessary modules and packages
const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const contactUsRoute = require("./routes/Contact");
const supportRoutes = require('./routes/supports');
const serviceRoutes = require("./routes/serviceroutes");
const postRoutes = require('./routes/blog');
const newsEventRoutes = require('./routes/News');


const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const appointmentRoutes = require('./routes/appoinment');
const ReportRoutes = require('./routes/report');
const paymentRoutes = require('./routes/payment');

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connectDb();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes and mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use('/api/v1/support', supportRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/blogs', postRoutes);
app.use('/api/v1/news-events', newsEventRoutes);

app.use("/api/v1/doctor", doctorRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointment', appointmentRoutes);
app.use('/api/v1/report', ReportRoutes);
app.use('/api/v1/payments', paymentRoutes);




// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});
app.post("/predict", (req, res) => {
	try {
	  const { pregnancies, glucose, bloodPressure, bmi, age } = req.body;
	  console.log("Received request for diabetes prediction:", req.body);
  
	  // Log the request body
	  console.log("Request Body:", req.body);
  
	  // Check if any required field is missing
	  if (
		pregnancies === undefined ||
		glucose === undefined ||
		bloodPressure === undefined ||
		bmi === undefined ||
		age === undefined
	  ) {
		return res.status(400).json({ error: "Missing required fields" });
	  }
  
	  // Define the criteria for diabetes prediction
	  const diabetesCriteria = [
		{ field: "glucose", threshold: 140, label: "High Glucose" },
		{ field: "bmi", threshold: 30, label: "Obesity" },
		{ field: "age", threshold: 45, label: "Advanced Age" },
		{ field: "bloodPressure", threshold: 140, label: "High Blood Pressure" },
		{ field: "pregnancies", threshold: 3, label: "Multiple Pregnancies" },
	  ];
  
	  // Check if any of the criteria are met
	  const metCriteria = diabetesCriteria.filter(
		(criterion) => req.body[criterion.field] >= criterion.threshold
	  );
  
	  // Determine the prediction based on the met criteria
	  let prediction;
	  if (metCriteria.length >= 3) {
		prediction = "Diabetes";
	  } else if (metCriteria.length >= 1) {
		prediction = "Pre-diabetes";
	  } else {
		prediction = "No Diabetes";
	  }
  
	  res.json({
		prediction,
		metCriteria: metCriteria.map((criterion) => criterion.label),
	  });
	} catch (error) {
	  console.error("Error:", error);
	  res.status(500).json({ error: "An error occurred while predicting." });
	}
  });
  
  // Prediction endpoint for heart disease
  app.post("/predict_heart_disease", (req, res) => {
	try {
	  const {
		age,
		sex,
		cp,
		trestbps,
		chol,
		fbs,
		restecg,
		thalach,
		exang,
		oldpeak,
		slope,
		ca,
		thal,
	  } = req.body;
  
	  // Check if any required field is missing
	  if (
		age === undefined ||
		sex === undefined ||
		cp === undefined ||
		trestbps === undefined ||
		chol === undefined ||
		fbs === undefined ||
		restecg === undefined ||
		thalach === undefined ||
		exang === undefined ||
		oldpeak === undefined ||
		slope === undefined ||
		ca === undefined ||
		thal === undefined
	  ) {
		return res.status(400).json({ error: "Missing required fields" });
	  }
  
	  // Define the criteria for heart disease prediction
	  const heartDiseaseCriteria = [
		{ field: "age", threshold: 60, label: "Advanced Age" },
		{ field: "sex", threshold: 1, label: "Male" },
		{ field: "cp", threshold: 1, label: "Atypical Angina" },
		{ field: "trestbps", threshold: 140, label: "High Blood Pressure" },
		{ field: "chol", threshold: 200, label: "High Cholesterol" },
		{ field: "fbs", threshold: 1, label: "High Fasting Blood Sugar" },
		{ field: "restecg", threshold: 1, label: "ST-T Wave Abnormality" },
		{ field: "thalach", threshold: 100, label: "Low Maximum Heart Rate" },
		{ field: "exang", threshold: 1, label: "Exercise-Induced Angina" },
		{ field: "oldpeak", threshold: 2, label: "Significant ST Depression" },
		{ field: "slope", threshold: 2, label: "Downsloping ST Segment" },
		{ field: "ca", threshold: 2, label: "Multiple Major Vessels Colored" },
		{ field: "thal", threshold: 2, label: "Defect on Thalassemia" },
	  ];
  
	  // Check if any of the criteria are met
	  const metCriteria = heartDiseaseCriteria.filter(
		(criterion) => req.body[criterion.field] >= criterion.threshold
	  );
  
	  // Determine the prediction based on the met criteria
	  let prediction;
	  if (metCriteria.length >= 5) {
		prediction = "High Risk of Heart Disease";
	  } else if (metCriteria.length >= 3) {
		prediction = "Moderate Risk of Heart Disease";
	  } else {
		prediction = "Low Risk of Heart Disease";
	  }
  
	  res.json({
		prediction,
		metCriteria: metCriteria.map((criterion) => criterion.label),
	  });
	} catch (error) {
	  console.error("Error:", error);
	  res
		.status(500)
		.json({ error: "An error occurred while predicting heart disease." });
	}
  });
  
  // Prediction endpoint for Parkinson's Disease
  app.post("/predict_parkinsons_disease", (req, res) => {
	try {
	  const {
		age,
		sex,
		tremors,
		rigidity,
		bradykinesia,
		postureInstability,
		gaitInstability,
	  } = req.body;
  
	  // Check if any required field is missing
	  if (
		age === undefined ||
		sex === undefined ||
		tremors === undefined ||
		rigidity === undefined ||
		bradykinesia === undefined ||
		postureInstability === undefined ||
		gaitInstability === undefined
	  ) {
		return res.status(400).json({ error: "Missing required fields" });
	  }
  
	  // Define the criteria for Parkinson's disease prediction
	  const parkinsonsCriteria = [
		{ field: "tremors", threshold: 1, label: "Tremors" },
		{ field: "rigidity", threshold: 1, label: "Rigidity" },
		{ field: "bradykinesia", threshold: 1, label: "Bradykinesia" },
		{
		  field: "postureInstability",
		  threshold: 1,
		  label: "Posture Instability",
		},
		{ field: "gaitInstability", threshold: 1, label: "Gait Instability" },
	  ];
  
	  // Check if any of the criteria are met
	  const metCriteria = parkinsonsCriteria.filter(
		(criterion) => req.body[criterion.field] >= criterion.threshold
	  );
  
	  // Determine the prediction based on the met criteria
	  let prediction;
	  if (metCriteria.length >= 3) {
		prediction = "High risk of Parkinson's disease";
	  } else if (metCriteria.length >= 1) {
		prediction = "Low to moderate risk of Parkinson's disease";
	  } else {
		prediction = "Low risk of Parkinson's disease";
	  }
  
	  res.json({
		prediction,
		metCriteria: metCriteria.map((criterion) => criterion.label),
	  });
	} catch (error) {
	  console.error("Error:", error);
	  res
		.status(500)
		.json({
		  error: "An error occurred while predicting Parkinson's disease.",
		});
	}
  });
  
  // Prediction endpoint for Pneumonia
  app.post("/predict_pneumonia", (req, res) => {
	try {
	  const { age, gender, symptoms, smokingHistory, comorbidities } = req.body;
  
	  // Check if any required field is missing
	  if (
		age === undefined ||
		symptoms === undefined ||
		smokingHistory === undefined ||
		comorbidities === undefined
	  ) {
		return res.status(400).json({ error: "Missing required fields" });
	  }
  
	  // Define the criteria for pneumonia prediction
	  const pneumoniaCriteria = [
		{ field: "age", threshold: 50, label: "Advanced Age" },
		{
		  field: "symptoms",
		  threshold: ["cough", "fever", "shortness_of_breath"],
		  label: "Common Symptoms",
		},
		{ field: "smokingHistory", threshold: true, label: "Smoking History" },
		{
		  field: "comorbidities",
		  threshold: ["diabetes", "heart_disease"],
		  label: "Comorbidities",
		},
	  ];
  
	  // Check if any of the criteria are met
	  const metCriteria = pneumoniaCriteria.filter((criterion) => {
		if (
		  criterion.field === "symptoms" ||
		  criterion.field === "comorbidities"
		) {
		  return criterion.threshold.every((item) =>
			req.body[criterion.field].includes(item)
		  );
		} else {
		  return req.body[criterion.field] >= criterion.threshold;
		}
	  });
  
	  // Determine the prediction based on the met criteria
	  let prediction;
	  if (metCriteria.length >= 3) {
		prediction = "High risk of pneumonia";
	  } else if (metCriteria.length >= 2) {
		prediction = "Moderate risk of pneumonia";
	  } else {
		prediction = "Low risk of pneumonia";
	  }
  
	  res.json({
		prediction,
		metCriteria: metCriteria.map((criterion) => criterion.label),
	  });
	} catch (error) {
	  console.error("Error:", error);
	  res
		.status(500)
		.json({ error: "An error occurred while predicting pneumonia." });
	}
  });
  

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
