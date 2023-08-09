import jwt_decode from 'jwt-decode';
import { postRequest } from '../../utils/api';
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const RequestForm = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [workflowOptions, setWorkflowOptions] = useState([]);

  useEffect(() => {
    // Fetch workflow options from the API here
    fetch('http://localhost:5005/api/workFlows')
      .then(response => response.json())
      .then(data => {
        const options = data.map(workflow => ({
          value: workflow.title,
          label: workflow.title
        }));
        setWorkflowOptions(options);
      })
      .catch(error => console.error('Error fetching workflow options:', error));
  }, []);

  const handleWorkflowChange = (selectedOption) => {
    setSelectedWorkflow(selectedOption);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  

  try {
    // Decode the JWT token to get the user information
    const  token=Cookies.get("accessToken");
    const decodedToken = jwt_decode(token);
    const userName =decodedToken.userName;
    console.log(decodedToken);
    const formData = {
			topic: selectedWorkflow.value,
			body: description,
			requestor:userName,
		};
    if (selectedFile) {
      formData.file= selectedFile;
    }

    const response = await postRequest(
      "http://localhost:5005/api/submitForm",
      formData,
      token
    );

    if (response.ok) {
      console.log('Form submitted successfully!');
      // Reset form fields or redirect as needed
    } else {
      console.error('Form submission failed.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
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
