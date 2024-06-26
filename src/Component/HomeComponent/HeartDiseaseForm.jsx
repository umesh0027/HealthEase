// Predictor/client/src/components/HeartDiseaseForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Navs from './Nav';
import Footer from '../Common/Footer';

function HeartDiseaseForm() {
  const initialFormData = {
    age: '',
    sex: '1',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState('');
  const [metCriteria, setMetCriteria] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate input values
    const { age, trestbps, chol, thalach, oldpeak, ca } = formData;
    if (
      age < 14 || age > 100 ||
      trestbps < 50 || trestbps > 200 ||
      chol < 100 || chol > 600 ||
      thalach < 50 || thalach > 250 ||
      oldpeak < 0 || oldpeak > 10 ||
      ca < 0 || ca > 4
    ) {
      setError('Please enter valid input values within the specified ranges.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/predict_heart_disease', formData);
      console.log('Prediction Response:', response.data); // Log the response from the server
      setPrediction(response.data.prediction);
      setMetCriteria(response.data.metCriteria);
    } catch (error) {
      console.error(error);
      setError('An error occurred while predicting heart disease.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPrediction('');
    setMetCriteria([]);
    setError('');
  };

  return (
    <>
    <Navs/>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <h1 className="text-3xl text-center mb-6 font-bold">HEART DISEASE PREDICTOR</h1>
          <form onSubmit={handleSubmit}>
            {/* Age */}
            <InputField
              label="Age (14-100)"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="14"
              max="100"
            />
            {/* Sex */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sex:
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="sex"
                    value="0"
                    checked={formData.sex === "0"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="sex"
                    value="1"
                    checked={formData.sex === "1"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Male</span>
                </label>
              </div>
            </div>
            {/* Other input fields */}
            {[
              { label: "Chest Pain Type", name: "cp", placeholder: "Enter chest pain type", min: "0", max: "3" },
              { label: "Resting Blood Pressure", name: "trestbps", placeholder: "Enter resting blood pressure", min: "50", max: "200" },
              { label: "Serum Cholesterol (mg/dl)", name: "chol", placeholder: "Enter serum cholesterol", min: "100", max: "600" },
              { label: "Fasting Blood Sugar > 120 mg/dl", name: "fbs", placeholder: "Enter fasting blood sugar", min: "0", max: "1" },
              { label: "Resting Electrocardiographic Results", name: "restecg", placeholder: "Enter resting electrocardiographic results", min: "0", max: "2" },
              { label: "Maximum Heart Rate Achieved", name: "thalach", placeholder: "Enter maximum heart rate achieved", min: "50", max: "250" },
              { label: "Exercise Induced Angina", name: "exang", placeholder: "Enter exercise induced angina", min: "0", max: "1" },
              { label: "ST Depression Induced by Exercise Relative to Rest", name: "oldpeak", placeholder: "Enter ST depression induced by exercise", min: "0", max: "10" },
              { label: "Slope of the Peak Exercise ST Segment", name: "slope", placeholder: "Enter slope of the peak exercise ST segment", min: "0", max: "2" },
              { label: "Number of Major Vessels Colored by Flourosopy", name: "ca", placeholder: "Enter number of major vessels colored by flourosopy", min: "0", max: "4" },
              { label: "Thalassemia", name: "thal", placeholder: "Enter thalassemia", min: "0", max: "3" }
            ].map((field, index) => (
              <InputField
                key={index}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
              />
            ))}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                Predict
              </button>
              {loading && <p className="text-gray-600">Predicting...</p>}
            </div>
          </form>
          {prediction && (
            <div className="mt-4">
              <p className="text-center">Prediction: <strong>{prediction}</strong></p>
              {metCriteria.length > 0 && (
                <div>
                  <p className="font-bold">Met Criteria:</p>
                  <ul>
                    {metCriteria.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
      <Footer/>
    </>
  );
}

const InputField = ({ label, name, value, onChange, placeholder, min, max }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
    />
    <p className="text-xs text-gray-500 mt-1">Min: {min}, Max: {max}</p>
  </div>
);

export default HeartDiseaseForm;
