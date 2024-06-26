// Predictor/client/src/components/ParkinsonsDiseaseForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Navs from './Nav';
import Footer from '../Common/Footer';

function ParkinsonsDiseaseForm() {
  const initialFormData = {
    age: 0,
    sex: '',
    tremors: 0,
    rigidity: 0,
    bradykinesia: 0,
    postureInstability: 0,
    gaitInstability: 0
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate input values
    if (
      formData.age < 0 ||
      formData.age > 150 ||
      formData.tremors < 0 ||
      formData.tremors > 4 ||
      formData.rigidity < 0 ||
      formData.rigidity > 4 ||
      formData.bradykinesia < 0 ||
      formData.bradykinesia > 4 ||
      formData.postureInstability < 0 ||
      formData.postureInstability > 4 ||
      formData.gaitInstability < 0 ||
      formData.gaitInstability > 4
    ) {
      setError('Please enter valid input values within the specified ranges.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/predict_parkinsons_disease', formData);
      setPrediction(response.data.prediction);
      setMetCriteria(response.data.metCriteria);
    } catch (error) {
      console.error(error);
      setError('An error occurred while predicting Parkinson\'s disease.');
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
      <h1 className="text-3xl font-bold mb-6 text-center">PARKINSON'S DISEASE PREDICTOR</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age (14-100):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="14"
              max="100"
            />
          </div>
          {/* Sex */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
              Sex:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Tremors */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tremors">
              Tremors (0-4):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tremors"
              type="number"
              name="tremors"
              value={formData.tremors}
              onChange={handleChange}
              placeholder="Enter tremors"
              min="0"
              max="4"
            />
          </div>
          {/* Rigidity */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rigidity">
              Rigidity (0-4):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rigidity"
              type="number"
              name="rigidity"
              value={formData.rigidity}
              onChange={handleChange}
              placeholder="Enter rigidity"
              min="0"
              max="4"
            />
          </div>
          {/* Bradykinesia */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bradykinesia">
              Bradykinesia (0-4):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bradykinesia"
              type="number"
              name="bradykinesia"
              value={formData.bradykinesia}
              onChange={handleChange}
              placeholder="Enter bradykinesia"
              min="0"
              max="4"
            />
          </div>
          {/* Posture Instability */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postureInstability">
              Posture Instability (0-4):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="postureInstability"
              type="number"
              name="postureInstability"
              value={formData.postureInstability}
              onChange={handleChange}
              placeholder="Enter posture instability"
              min="0"
              max="4"
            />
          </div>
          {/* Gait Instability */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gaitInstability">
              Gait Instability (0-4):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gaitInstability"
              type="number"
              name="gaitInstability"
              value={formData.gaitInstability}
              onChange={handleChange}
              placeholder="Enter gait instability"
              min="0"
              max="4"
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

export default ParkinsonsDiseaseForm;