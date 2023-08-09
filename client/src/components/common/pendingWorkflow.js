import React from 'react';

const WorkStatusFilter = () => {
  return (
    <div className="border border-black p-4 rounded-lg mb-4 flex flex-col items-center justify-center w-80">
      <div className="flex space-x-4 mb-4">
        <div className="w-32">
          <label htmlFor="status" className="block font-semibold text-gray-600">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="w-32">
          <label htmlFor="sortBy" className="block font-semibold text-gray-600">
            Sort By Date
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <p className="text-center text-lg font-semibold text-gray-800">
        Total Pending Work: 10
      </p>
    </div>
  );
};

export default WorkStatusFilter;
