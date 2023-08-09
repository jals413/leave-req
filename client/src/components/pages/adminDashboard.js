import React from 'react';
import WorkStatusFilter from '../common/pendingWorkflow';
import NavigationButtons from '../common/twoButton';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <WorkStatusFilter  />
      <NavigationButtons link1="/workflow-form" text1="Create New WorkFlow"  link2="/audit-logs" text2="Check Logs" />
    </div>
  );
};

export default AdminDashboard;
