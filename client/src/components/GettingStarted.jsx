import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { useAuth } from '../../store/auth'; 
import { useNavigate } from 'react-router-dom';
import './GettingStarted.css';

const GettingStarted = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 
  const { token } = useAuth(); 

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res_data = await response.json(); 
        alert("Successful Project Created");

        navigate("/code", { state: { projectId: res_data.projectId } });
      } else {
        alert("Error creating project: " + response.statusText);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }

    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="GettingStarted-container">
        <div className="left">
          <button onClick={() => setShowModal(true)}>Get Started</button>
        </div>
        <div className="right">
          <h2>Your Recent Projects:</h2>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
            <h2>Get Started Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Project Name"
                {...register('name', { required: 'Project Name is required' })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}

              <input
                type="text"
                placeholder="Description"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="error">{errors.description.message}</p>}
              
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GettingStarted;
