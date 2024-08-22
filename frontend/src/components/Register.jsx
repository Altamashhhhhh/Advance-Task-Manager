import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import "../style/Register.css"
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://advance-task-manager.onrender.com/user/register", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.status === 201 || response.status === 200) {
        toast({
          title: "User created successfully",
          duration: 3000,
          isClosable: true,
          status: "success"
        });
        setSuccess(true);
      } else { 
        toast({
          title: "Something went wrong. Please try again.",
          duration: 5000,
          isClosable: true,
          status: "error"
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        duration: 10000,
        isClosable: true,
        status: "error"
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };
  

  return (
    <div className="register-container">
      <h1 className="register-title">REGISTER</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="register-label">Name :</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleFormData}
          className="register-input"
        />

        <label htmlFor="email" className="register-label">Email :</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleFormData}
          className="register-input"
        />

        <label htmlFor="password" className="register-label">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleFormData}
          className="register-input"
        />

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register Now"}
        </button>
        <button  className="register-button" onClick={()=>navigate('/login')}>
          Login Here
        </button>
        

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">User Registered Successfully</p>}
      </form>
    </div>
  );
};

export default Register;
