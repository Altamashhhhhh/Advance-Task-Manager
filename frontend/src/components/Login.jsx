import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Login.css"
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((data) => {
      return { ...data, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://advance-task-manager.onrender.com/user/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('token', response.data.token);
      setSuccess(true);
      toast({
        title: 'Login Successful',
        duration: 3000,
        isClosable: true,
        status: 'success'
      });
      setTimeout(() => {
        navigate('/tasks');
      }, 2000);

    } catch (error) {
      const errorMsg = error.message;
      setError(errorMsg);
      toast({
        title: errorMsg,
        status: 'error',
        isClosable: true,
        duration: 7000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <div className="login-container">
    <h1 className="login-title">LOGIN</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="login-label">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleFormData}
          className="login-input"
        />

        <label htmlFor="password" className="login-label">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleFormData}
          className="login-input"
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in ...' : 'Login Now'}
        </button>

        <button  className="login-button" onClick={()=>navigate('/register')}>
          Register Here
        </button>


        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login Successful</p>}
      </form>
    </div>
    </>
  );
};

export default Login;
