import React, { useState } from 'react';
import Select from 'react-select';

const workflowOptions = [
  // Your list of workflow options here
  { value: 'workflow1', label: 'Workflow 1' },
  { value: 'workflow2', label: 'Workflow 2' },
  { value: 'workflow3', label: 'Workflow 3' },
  // ...
];

const RequestForm = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleWorkflowChange = (selectedOption) => {
    setSelectedWorkflow(selectedOption);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="bg-pink-100 p-10 rounded-xl shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="workflow" className="block text-xl font-medium mb-3">
            Select Workflow
          </label>
          <Select
            id="workflow"
            name="workflow"
            value={selectedWorkflow}
            onChange={handleWorkflowChange}
            options={workflowOptions}
            placeholder="Select Workflow"
            isSearchable
            className="w-full rounded-xl bg-pink-200 p-4"
            menuPortalTarget={document.body}
            maxMenuHeight={150}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-xl font-medium mb-3">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            className="w-full rounded-xl bg-pink-200 p-4"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="file" className="block text-xl font-medium mb-3">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full rounded-xl bg-pink-200 p-4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
