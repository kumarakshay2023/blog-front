// src/components/Signup.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import the Modal component
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './loginSignup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State for controlling the modal
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSignup = async(e) => {
    // Handle signup logic here
    e.preventDefault();
    const signupData = {
        name,
        email,
        password
    }
    try {
        const res = await axios.post('http://51.20.142.237:3030/user/register',signupData)
        const token = res.data.token
        localStorage.setItem('token', token);
        setMessage('User Sign Up Sucessfully');
        setShowModal(true); // Show the modal with the message
        navigate('/blog');


    } catch (error) {
        const errorMsg = error.response.data.msg;
      setMessage(errorMsg);
      setShowModal(true); // Show the modal with the error message

    }
  
   
    
   

  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
