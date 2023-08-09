import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getRequest } from '../../utils/api';
import Cookies from 'js-cookie';
import WorkflowPopup from "./workflowPopup";


const PreviousRequests = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  const [previousRequests, setPreviousRequests] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null); // Track selected workflow
  const [showPopup, setShowPopup] = useState(false); // Toggle popup visibility

  
  useEffect(() => {
    const fetchPreviousRequests = async () => {
      try {
        const token = Cookies.get('accessToken'); // Assuming you have the Cookies library imported
        const decodedToken = jwt_decode(token);
        const userName = decodedToken.userName;
        const url = `http://localhost:5005/api/getFormsByUser?userName=${userName}`;

        getRequest(url, token, (data) => {
          setPreviousRequests(data);
        });

      } catch (error) {
        console.error(error);
        // TODO: Handle error
      }
    };


    fetchPreviousRequests();
  }, []);

  const handleExpandClick = (workflow) => {
    setSelectedWorkflow(workflow);
    setShowPopup(true); // Show popup when expand is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup when close button is clicked
  };
  return (
    <div>
  <h2 className="text-xl font-semibold mb-4">Previous Requests</h2>
  <ul>
    {previousRequests.map((request) => (
      <li
        key={request._id}
        className="mb-4 border border-black p-4 rounded-lg flex flex-row"
        style={{ 
          backgroundColor:
            request.status === 'Accepted'
              ? 'lightgreen'
              : request.status === 'Processing'
              ? 'lightyellow'
              : request.status === 'Rejected'
              ? 'lightcoral'
              : 'inherit', // Default background color
        }}
      >
        <p className="flex items-center space-x-4">
          <span className="font-bold">Workflow:</span> {request.topic}
          <span className="font-bold">Request Raised by:</span> {request.requestor}
          <span className="font-bold">Date:</span> {formatDate(request.createdAt)}
          <span className="font-bold">Status:</span> {request.status}
          <button
            className="bg-blue-500 text-white px-2 py-1 ml-5 rounded-lg hover:bg-blue-600"
            onClick={() => handleExpandClick(request)} // Call handleExpandClick on button click
          >
            Expand
          </button>
        </p>
      </li>
    ))}
  </ul>
  {showPopup && (
      <WorkflowPopup
        workflow={selectedWorkflow}
        onClose={handleClosePopup} // Pass handleClosePopup as a prop
      />
    )}
</div>

  );
};

export default PreviousRequests;
