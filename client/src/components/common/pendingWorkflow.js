import React, { useState, useEffect } from 'react';
import { getRequest } from '../../utils/api'; // Import your getRequest function

const WorkStatusFilter = () => {
  const [forms, setForms] = useState([]);
  const [totalProcessing, setTotalProcessing] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');

  const fetchForms = async () => {
    try {
      const queryParams = {
        status: statusFilter === 'Processing' ? 'processing' : statusFilter,
        dateRange: dateRange,
      };

      if (dateRange === 'today') {
        queryParams.dateRange = 'today';
      } else if (dateRange === 'thisWeek') {
        queryParams.dateRange = 'thisWeek';
      } else if (dateRange === 'thisMonth') {
        queryParams.dateRange = 'thisMonth';
      } else if (dateRange === 'thisYear') {
        queryParams.dateRange = 'thisYear';
      }

      const response = await getRequest('http://localhost:5005/api/forms', queryParams);

      setForms(response.data);
      setTotalProcessing(response.data.filter(form => form.status === 'processing').length);

    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [statusFilter,dateRange]);

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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Processing">Processing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Date range filter */}
        <div className="w-32">
          <label htmlFor="dateRange" className="block font-semibold text-gray-600">
            Date Range
          </label>
          <select
            id="dateRange"
            name="dateRange"
            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>

      <p className="text-center text-lg font-semibold text-gray-800">
        Total Processing Work: {totalProcessing}
      </p>
    </div>
  );
};

export default WorkStatusFilter;
