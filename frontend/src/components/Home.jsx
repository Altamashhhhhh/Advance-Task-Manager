import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-background">
      <div className="home-content">
        <h1 className="home-title">ADVANCE TASK MANAGER</h1>
        <button className="home-button" onClick={() => navigate('/register')}>
          REGISTER HERE
        </button>
        <button className="home-button" onClick={() => navigate('/login')}>
          LOGIN HERE
        </button>
      </div>
    </div>
  );
};

export default Home;
