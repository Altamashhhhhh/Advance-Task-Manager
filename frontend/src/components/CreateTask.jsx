import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import "../style/CreateTask.css";
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    isComplete: false,
    assignee: ""
  });

  const handleFormData =  (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://advance-task-manager.onrender.com/task/create", formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      toast({
        title: "Task Added Successfully",
        status: "success",
        isClosable: true,
        duration: 4000
      })
      console.log(formData)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred.";
      console.log(error);
      toast({
        title: errorMsg,
        status: "error",
        isClosable: true,
        duration: 4000
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-task-container">
      <h1 className="create-task-title">Create Task</h1>
      <form className="create-task-form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="create-task-label">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleFormData}
          className="create-task-input"
        />

        <label htmlFor="isComplete" className="create-task-label">Completed: </label>
        <div className="create-task-checkbox-container">
          <input
            type="checkbox"
            name="isComplete"
            id="isComplete"
            checked={formData.isComplete}
            onChange={handleFormData}
            className="create-task-checkbox"
          />
          <span>Is Task Complete ?</span>
        </div>

        <label htmlFor="assignee" className="create-task-label">Assignee: </label>
        <input
          type="text"
          id="assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleFormData}
          className="create-task-input"
        />

        <button type="submit" className="create-task-button" disabled={loading}>
          {loading ? "ADDING TASK ..." : "ADD TASK"}
        </button>
        <button  className="create-task-button" onClick={()=>{
          localStorage.removeItem("token") ; 
          navigate("/login")
        }} >LOG OUT
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
