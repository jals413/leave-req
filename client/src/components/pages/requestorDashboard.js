import React from 'react';
import { useState } from 'react';
import NavigationButtons from '../common/twoButton';

const RequestorDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Requestor Dashboard</h1>
      <NavigationButtons link1="/requestor-form" text1="Raise a Request" link2="/all-records" text2="Previous Records" />
    </div>
  );
};

export default RequestorDashboard;
