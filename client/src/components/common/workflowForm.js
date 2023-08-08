import React, { useState } from 'react';
import Select from 'react-select';

const titleOptions = [
  // Your list of title options here
  { value: 'title1', label: 'Women 1' },
  { value: 'title2', label: 'Title 2' },
  { value: 'title3', label: 'Title 3' },
  { value: 'title4', label: 'Title 4' },
  { value: 'title5', label: 'Title 5' },
  { value: 'title6', label: 'Title 6' },
  { value: 'title7', label: 'Title 7' },



  // ...
];

const approverOptions = [
  // Your list of approvers here
  { value: 'title1', label: 'Women 1' },
  { value: 'title2', label: 'Title 2' },
  { value: 'title3', label: 'Title 3' },
  { value: 'title4', label: 'Title 4' },
  { value: 'title5', label: 'Title 5' },
  { value: 'title6', label: 'Title 6' },
  { value: 'title7', label: 'Title 7' },
  // Example: { value: 'approver1', label: 'Approver 1' }
  // ...
];

const WorkflowForm = () => {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedApprover, setSelectedApprover] = useState(null);
  const [approvalType, setApprovalType] = useState('');

  const handleTitleChange = (selectedOption) => {
    setSelectedTitle(selectedOption);
  };

  const handleApproverChange = (selectedOption) => {
    setSelectedApprover(selectedOption);
  };

  const handleApprovalTypeChange = (event) => {
    setApprovalType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const customFilter = (option, searchText) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };


  return (
    <div className="bg-pink-100 p-10 rounded-xl shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
      <div className="mb-6">
          <label htmlFor="title" className="block text-xl font-medium mb-3">
            Title of the Workflow
          </label>
          <Select
            id="title"
            name="title"
            value={selectedTitle}
            onChange={handleTitleChange}
            options={titleOptions}
            placeholder="Select Title"
            isSearchable
            filterOption={customFilter}
            className="w-full rounded-xl bg-pink-100 p-4"
            menuPortalTarget={document.body}
            maxMenuHeight={150}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="approver" className="block text-xl font-medium mb-3">
            Approvers
          </label>
          <Select
            id="approver"
            name="approver"
            value={selectedApprover}
            onChange={handleApproverChange}
            options={approverOptions}
            placeholder="Select Approver"
            isSearchable
            filterOption={customFilter}
            className="w-full rounded-xl bg-pink-100 p-4"
            menuPortalTarget={document.body}
            maxMenuHeight={150}
          />
        </div>


        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Type of Approval</label>
          <div className="block items-center space-x-20">
            <label>
              <input
                type="radio"
                name="approvalType"
                value="type1"
                checked={approvalType === 'type1'}
                onChange={handleApprovalTypeChange}
                className="mr-1"
              />
              Type 1
            </label>
            <label>
              <input
                type="radio"
                name="approvalType"
                value="type2"
                checked={approvalType === 'type2'}
                onChange={handleApprovalTypeChange}
                className="mr-1"
              />
              Type 2
            </label>
            {/* Add more radio options as needed */}
          </div>
        </div>


        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default WorkflowForm;
