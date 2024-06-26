// Predictor/client/src/components/DiabetesForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Navs from './Nav';
import Footer from '../Common/Footer';

function DiabetesForm() {
  const initialFormData = {
    pregnancies: 0,
    glucose: 0,
    bloodPressure: 0,
    bmi: 0,
    age: 0
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
    const { pregnancies, glucose, bloodPressure, bmi, age } = formData;
    if (pregnancies < 0 || pregnancies > 10 || glucose < 50 || glucose > 300 || bloodPressure < 50 || bloodPressure > 200 || bmi < 10 || bmi > 50 || age < 18 || age > 100) {
      setError('Please enter valid input values within the specified ranges.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/predict', formData);
      console.log('Prediction Response:', response.data); // Log the response from the server
      setPrediction(response.data.prediction);
      setMetCriteria(response.data.metCriteria);
    } catch (error) {
      console.error(error);
      setError('An error occurred while predicting.');
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
        <h1 className="text-3xl text-center mb-6 font-bold">DIABETES PREDICTOR</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pregnancies">
              Pregnancies (0-10):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pregnancies"
              type="number"
              name="pregnancies"
              value={formData.pregnancies}
              onChange={handleChange}
              placeholder="Enter number of pregnancies"
              min="0"
              max="10"
            />
          </div>
          {/* Glucose */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="glucose">
              Glucose (50-300):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="glucose"
              type="number"
              name="glucose"
              value={formData.glucose}
              onChange={handleChange}
              placeholder="Enter glucose level"
              min="50"
              max="300"
            />
          </div>
          {/* Blood Pressure */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodPressure">
              Blood Pressure (50-200):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bloodPressure"
              type="number"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              placeholder="Enter blood pressure"
              min="50"
              max="200"
            />
          </div>
          {/* BMI */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bmi">
              BMI (10-50):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bmi"
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              placeholder="Enter BMI"
              min="10"
              max="50"
            />
          </div>
          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age (18-100):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="18"
              max="100"
            />
          </div>
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

export default DiabetesForm;
