import React, { useState, useEffect } from 'react';
import { getRequest, putRequest } from '../../utils/api';
import Cookies from 'js-cookie'; // Import the 'js-cookie' library
import ReqPopup from './reqPopup'; // Make sure to import your WorkflowPopup component

const PendingRequest = () => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      };
      
  const [workflowList, setWorkflowList] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [rejectNote, setRejectNote] = useState('');

  useEffect(() => {
    fetchWorkflowList();
  }, []);

  const fetchWorkflowList = async () => {
    const accessToken = Cookies.get('accessToken'); // Retrieve accessToken from cookie

    await getRequest('http://localhost:5005/api/pending-forms', accessToken, (data) => {
      setWorkflowList(data);
    });
  };

  const handleExpandClick = (workflow) => {
    setSelectedWorkflow(workflow);
    setShowPopup(true);
  };

  const handleAcceptClick = async () => {
    const accessToken = Cookies.get('accessToken'); // Retrieve accessToken from cookie

    const updatedWorkflow = { ...selectedWorkflow, status: 'Approved' };

    await putRequest('http://localhost:5005/api/forms/' + selectedWorkflow._id, updatedWorkflow, accessToken, () => {
      // Update the workflow list after successful update
      fetchWorkflowList();
      // Close the popup
      setShowPopup(false);
    });
  };

  const handleRejectClick = async () => {
    // Show a note input popup or modal to capture the rejection note
    const note = window.prompt('Enter rejection note:');
    if (note !== null) {
      const accessToken = Cookies.get('accessToken'); // Retrieve accessToken from cookie

      const updatedWorkflow = { ...selectedWorkflow, status: 'Rejected', notes: note };

      await putRequest('http://localhost:5005/api/forms/' + selectedWorkflow._id, updatedWorkflow, accessToken, () => {
        // Update the workflow list after successful update
        fetchWorkflowList();
        // Close the popup
        setShowPopup(false);
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
      <ul>
        {workflowList.map((workflow) => (
          <li key={workflow._id} className="mb-4">
            <span className="font-bold">Workflow:</span> {workflow.topic}
            <br />
            <span className="font-bold">Request Raised by:</span> {workflow.requestor}
            <br />
            <span className="font-bold">Date:</span> {formatDate(workflow.createdAt)}
            <br />
            <span className="font-bold">Status:</span> {workflow.status}
            <br />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              onClick={() => handleExpandClick(workflow)}
            >
              Expand
            </button>
          </li>
        ))}
      </ul>
      {showPopup && (
        <ReqPopup
          workflow={selectedWorkflow}
          onClose={() => setShowPopup(false)}
          onAccept={handleAcceptClick}
          onReject={handleRejectClick}
        />
      )}
    </div>
  );
};

export default PendingRequest;
