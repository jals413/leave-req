import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { getRequest } from '../../utils/api'; // Import your getRequest function

const WorkStatusFilter = () => {
  const [forms, setForms] = useState([]);
  const [totalProcessing, setTotalProcessing] = useState(0);
  const [dateRange, setDateRange] = useState('');
  const fetchForms = async () => {
    try {
      const queryParams = {
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

      const handelRecords=(response)=>
      {
        const count= response.length
        setTotalProcessing(count)
      }
      const  token=Cookies.get("accessToken");
      const response = await getRequest(`http://localhost:5005/api/forms?dateRange=${queryParams.dateRange}`,token,handelRecords);
      // console.log(response.length);
      setForms(totalProcessing);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [dateRange]);

  return (
    <div className="border border-black p-4 rounded-lg mb-4 flex flex-col items-center justify-center w-80">
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

      <p className="text-center text-lg font-semibold text-gray-800">
        Total Processing Work: {totalProcessing}
      </p>
    </div>
  );
};

export default WorkStatusFilter;
