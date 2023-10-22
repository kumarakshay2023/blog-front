// src/components/Login.js
import React, { useState, } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';
import './loginSignup.css';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
 
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const loginData ={
        email,password
    }
    try {
        await axios.post('http://localhost:3030/user/login',loginData);
        setMessage('User Login Sucessfully');
        setShowModal(true);
        navigate('/blog');
    } catch (error) {
        const errorMsg = error.response.data.msg;
      setMessage(errorMsg);
      setShowModal(true); 
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
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

export default Login;
