import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BillDetails = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bills/${billId}`);
        if (response.data.success) {
          setBill(response.data.bill);
        } else {
          toast.error('Failed to fetch bill details');
        }
      } catch (error) {
        console.error('Error fetching bill details:', error);
        toast.error('Failed to fetch bill details');
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [billId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bill) {
    return <div>No bill found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Bill Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p><strong>Bill ID:</strong> {bill.billId}</p>
        <p><strong>Appointment ID:</strong> {bill.appointmentId}</p>
        <p><strong>Doctor:</strong> {bill.doctor.name} ({bill.doctor.specialization})</p>
        <p><strong>Patient:</strong> {bill.patient.name} (ID: {bill.patient.patientId})</p>
        <p><strong>Fee:</strong> ₹{bill.fee / 100}</p>
        <p><strong>Payment Status:</strong> {bill.paymentStatus}</p>
        <p><strong>Payment ID:</strong> {bill.paymentId}</p>
        <p><strong>Appointment Date:</strong> {new Date(bill.appointmentDate).toLocaleDateString()}</p>
        <p><strong>Appointment Time:</strong> {bill.appointmentTime}</p>
        <p><strong>Description:</strong> {bill.description}</p>
        <p><strong>Created At:</strong> {new Date(bill.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BillDetails;
