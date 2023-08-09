import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { postRequest, getRequest } from "../../utils/api";

const WorkflowForm = () => {
	const [selectedTitle, setSelectedTitle] = useState("");
	const [selectedApprovers, setSelectedApprovers] = useState([]);
	const [approvalType, setApprovalType] = useState("");
	const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
	const [isFailurePopupVisible, setIsFailurePopupVisible] = useState(false);
	const [approverOptions, setApproverOptions] = useState([]);

	useEffect(() => {
		// Retrieve the access token from the cookie
		const token = Cookies.get("accessToken");

		// Fetch list of approvers
		getRequest(
			"http://localhost:5005/user/getApprover",
			token,
			handleApproverList
		);
	}, []);

	const handleApproverList = (response) => {
		const mappedOptions = response.map((approver) => ({
			value: approver.userName,
			label: approver.userName,
		}));
		setApproverOptions(mappedOptions);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Retrieve the access token from the cookie
		const token = Cookies.get("accessToken");

		const formData = {
			title: selectedTitle,
			approvers: selectedApprovers.map((approver) => approver.value),
			approvalType,
		};

		try {
			const response = await postRequest(
				"http://localhost:5005/api/createWorkflow",
				formData,
				token
			);

			if (response) {
				setIsSuccessPopupVisible(true);
				// Optionally, reset form fields or show a success message
			} else {
				setIsFailurePopupVisible(true);
				// Optionally, show an error message
			}
		} catch (error) {
			console.error("An error occurred:", error);
			setIsFailurePopupVisible(true);
		}
	};

	const closePopup = () => {
		setIsSuccessPopupVisible(false);
		setIsFailurePopupVisible(false);
	};

	const customFilter = (option, searchText) => {
		return option.label.toLowerCase().includes(searchText.toLowerCase());
	};

	return (
		<div className="bg-pink-100 p-10 rounded-xl shadow-md max-w-md mx-auto">
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor="title"
						className="block text-xl font-medium mb-3"
					>
						Title of the Workflow
					</label>
					<input
						id="title"
						name="title"
						type="text"
						value={selectedTitle}
						onChange={(event) =>
							setSelectedTitle(event.target.value)
						}
						placeholder="Enter Title"
						className="w-full rounded-xl bg-pink-100 p-4"
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="approver"
						className="block text-xl font-medium mb-3"
					>
						Approvers
					</label>
					<Select
						id="approver"
						name="approver"
						value={selectedApprovers}
						onChange={setSelectedApprovers}
						options={approverOptions}
						placeholder="Select Approver"
						isMulti // Allow multiple selections
						closeMenuOnSelect={false} // Keep the menu open after selecting
						filterOption={customFilter}
						className="w-full rounded-xl bg-pink-100 p-4"
						menuPortalTarget={document.body}
						maxMenuHeight={150}
					/>
				</div>

				<div className="mb-6">
					<label className="block text-xl font-medium mb-2">
						Type of Approval
					</label>
					<div className="block items-center space-x-20">
						<label>
							<input
								type="radio"
								name="approvalType"
								value="0"
								checked={approvalType === "0"}
								onChange={() => setApprovalType("0")}
								className="mr-1"
							/>
							All should Approve
						</label>
						<label>
							<input
								type="radio"
								name="approvalType"
								value="1"
								checked={approvalType === "1"}
								onChange={() => setApprovalType("1")}
								className="mr-1"
							/>
							Atleast 2 Can Approve
						</label>
						<label>
							<input
								type="radio"
								name="approvalType"
								value="2"
								checked={approvalType === "2"}
								onChange={() => setApprovalType("2")}
								className="mr-1"
							/>
							Anyone Can Approve
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
				>
					Create
				</button>

				{/* Success and Failure popups */}
				{isSuccessPopupVisible && (
					<div className="popup success-popup">
						<p className="text-green-600">
							Form submitted successfully!
						</p>
						<button
							className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
							onClick={closePopup}
						>
							Close
						</button>
					</div>
				)}

				{isFailurePopupVisible && (
					<div className="popup failure-popup">
						<p className="text-red-600">
							Form submission failed. Please try again.
						</p>
						<button
							className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
							onClick={closePopup}
						>
							Close
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default WorkflowForm;
