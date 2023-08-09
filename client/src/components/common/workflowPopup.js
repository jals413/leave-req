import React from 'react';

const WorkflowPopup = ({ workflow, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h3 className="text-xl font-semibold mb-4">Expanded Workflow Details</h3>
        <p className="mb-2"><span className="font-bold">Workflow:</span> {workflow.topic}</p>
        <p className="mb-2"><span className="font-bold">Created by:</span> {workflow.requestor}</p>
        <p className="mb-2"><span className="font-bold">Date:</span> {formatDate(workflow.createdAt)}</p>
        <p className="mb-2"><span className="font-bold">Status:</span> {workflow.status}</p>
        <p className="mb-4"><span className="font-bold">Description:</span> {workflow.body}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPopup;
