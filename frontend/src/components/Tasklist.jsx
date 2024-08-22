import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import '../style/Tasklist.css';

const Tasklist = () => {
  const token = localStorage.getItem('token');
  const [loading , setLoading] = useState(false)
  const [data, setData] = useState([]);
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://advance-task-manager.onrender.com/task/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data.task);
      console.log(response.data.task);
      toast({
        title: 'Task List Fetched Successfully',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    } catch (error) {
      setLoading(false)
      console.error(error);
      toast({
        title: 'Error Fetching Task List',
        status: 'error',
        duration: 2000,
      });
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="tasklist-container">
      <button className="fetch-button"  onClick={fetchData} disabled={loading} >{loading ? "FETCHING ....." : "FETCH DATA"}</button>
      <h1 className="tasklist-title">TASK MANAGER</h1>
      <table className="tasklist-table">
        <thead>
          <tr>
            <th>TASK ID</th>
            <th>TITLE</th>
            <th>STATUS</th>
            <th>ASSIGNEE</th>
          </tr>
        </thead>
        <tbody>
          {data.map(task => (
            <tr key={task._id}>
              <td>{task._id}</td>
              <td>{task.title}</td>
              <td>{task.isComplete ? 'Completed' : 'Incomplete'}</td>
              <td>{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasklist;
