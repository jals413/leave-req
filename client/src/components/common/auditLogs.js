import React, { useState, useEffect } from 'react';
import { getRequest } from '../../utils/api';
import Cookies from 'js-cookie'; // Import the 'js-cookie' library

const Auditlogs = () => {
  const [workflowList, setWorkflowList] = useState([]);

  useEffect(() => {
    fetchWorkflowList();
  }, []);

  const fetchWorkflowList = async () => {
    const accessToken = Cookies.get('accessToken'); // Retrieve accessToken from cookie

    getRequest('http://localhost:5005/api/getForms', accessToken, (data) => {
      setWorkflowList(data);
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Audit Logs</h2>
      <ul>
        {workflowList.map((workflow) => (
          <li key={workflow._id} className="mb-4">
            <span className="font-bold">Workflow:</span> {workflow.topic} 
            <br />
            <span className="font-bold">Request Raised by:</span> {workflow.userName} 
            <br />
            <span className="font-bold">Date:</span> {workflow.date} 
            <br />
            <span className="font-bold">Status:</span> {workflow.status} 
            <br />
            <button className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600">
              Expand
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auditlogs;
