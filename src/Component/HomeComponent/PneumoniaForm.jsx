// Predictor/client/src/components/PneumoniaForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Navs from './Nav';
import Footer from '../Common/Footer';

const PneumoniaForm = () => {
  const initialFormData = {
    age: '',
    gender: '',
    symptoms: [],
    smokingHistory: 'no',
    comorbidities: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [metCriteria, setMetCriteria] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/predict_pneumonia', formData);
      setPrediction(response.data.prediction);
      setMetCriteria(response.data.metCriteria);
    } catch (error) {
      console.error(error);
      setError('An error occurred while predicting pneumonia.');
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
        <h1 className="text-3xl font-bold mb-6 text-center">PNEUMONIA PREDICTOR</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto" noValidate>
          {/* Input fields */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age (0-120):</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter age"
              min="0"
              max="120"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Symptoms checkboxes */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Symptoms:</label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="symptoms"
                  value="cough"
                  checked={formData.symptoms.includes('cough')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Cough</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="symptoms"
                  value="fever"
                  checked={formData.symptoms.includes('fever')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Fever</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="symptoms"
                  value="shortness_of_breath"
                  checked={formData.symptoms.includes('shortness_of_breath')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Shortness of Breath</span>
              </label>
              {/* Add more symptom checkboxes as needed */}
            </div>
          </div>
          {/* Smoking history radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Smoking History:</label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="smokingHistory"
                  value="yes"
                  checked={formData.smokingHistory === 'yes'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                  required
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="smokingHistory"
                  value="no"
                  checked={formData.smokingHistory === 'no'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                  required
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>
          {/* Comorbidities checkboxes */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Comorbidities:</label>
            <div className="flex flex-wrap">
              <label className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  name="comorbidities"
                  value="diabetes"
                  checked={formData.comorbidities.includes('diabetes')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Diabetes</span>
              </label>
              <label className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  name="comorbidities"
                  value="heart_disease"
                  checked={formData.comorbidities.includes('heart_disease')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Heart Disease</span>
              </label>
              <label className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  name="comorbidities"
                  value="hypertension"
                  checked={formData.comorbidities.includes('hypertension')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Hypertension</span>
              </label>
              {/* Add more comorbidity checkboxes as needed */}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
        </form>
        {/* Display prediction result */}
        {prediction && (
          <div className="mt-4">
            <p className="text-center">Prediction: <strong>{prediction}</strong></p>
            {metCriteria.length > 0 && (
              <div>
                <p className="font-bold text-center">Met Criteria:</p>
                <ul className="text-center">
                  {metCriteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {/* Display error message */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PneumoniaForm;
