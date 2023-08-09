import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import RequestForm from "./components/common/requestForm";
import LoginForm from "./components/pages/login";
import CreateWorkflow from "./components/pages/createWorkflow";
import AdminDashboard from "./components/pages/adminDashboard";
import Auditlogs from "./components/common/auditLogs";
import RequestorDashboard from "./components/pages/requestorDashboard";
import PreviousRequests from "./components/common/prevRecords";
import ApproverDashboard from "./components/pages/approverDashboard";

function App() {
	return (
		<Router>
			<div className="App">
				{/* Define your navigation menu or links here */}

				{/* Define routes for different components */}
				<Routes>
					<Route path="/requestor-form" element={<RequestForm />} />
					<Route path="/workflow-form" element={<CreateWorkflow />} />
					<Route path="/admin-dashboard" element={<AdminDashboard />} />
					<Route path="/requestor-dashboard" element={<RequestorDashboard />} />
					<Route path="/approver-dashboard" element={<ApproverDashboard />} />
					<Route path="/audit-logs" element={<Auditlogs />} />
					<Route path="/all-records" element={<PreviousRequests />} />
					<Route path="/login" element={<LoginForm />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
