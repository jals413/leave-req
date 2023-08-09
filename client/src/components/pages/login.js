import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const LoginForm = () => {
    const navigate = useNavigate();
  const [userEmail, setEmailOrUsername] = useState('');
  const [userPassword, setPassword] = useState('');

  const handleEmailOrUsernameChange = (event) => {
    setEmailOrUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      userEmail,
      userPassword,
    };

    try {
      const response = await fetch("http://localhost:5005/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login logic
        console.log("Login successful:", data);

        // Store access token in a cookie that expires in 7 days
        Cookies.set("accessToken", data.accessToken, { expires: 7 });

        // Decode the access token to retrieve userRole
      try {
        const decodedToken = jwtDecode(data.accessToken);
        const userRole = decodedToken.userRole;
        console.log(userRole);
        // Check if userRole is "Admin" before redirecting
        if (userRole === "Admin") {
          // Redirect to the workflow-form page
          navigate("/admin-dashboard");
        } else if (userRole ==='Approver'){
          navigate("/approver-dashboard")
          // TODO: Redirect to a different page for non-Admin users
        }
        else if(userRole === 'Requestor')
        {
          navigate("/requestor-dashboard")
        }
        else{
          console.log("User is not an Admin. Redirecting to a different page.");
        }
      } catch (error) {
        console.error("Error decoding access token:", error);
        // TODO: Handle decoding error
      }
      } else {
        // Failed login logic
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-sm font-medium mb-1">
            Email or Username
          </label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={handleEmailOrUsernameChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Email or Username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
