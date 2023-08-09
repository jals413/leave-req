import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getRequest } from '../../utils/api';
import Cookies from 'js-cookie';

const PreviousRequests = () => {
  const [previousRequests, setPreviousRequests] = useState([]);
  
  useEffect(() => {
    const fetchPreviousRequests = async () => {
      try {
        const token = Cookies.get('accessToken'); // Assuming you have the Cookies library imported
        const decodedToken = jwt_decode(token);
        const userName = decodedToken.userName;

        const url = `http://localhost:5005/api/getForms?userName=${userName}`;

        getRequest(url, token, (data) => {
          setPreviousRequests(data);
        });
      } catch (error) {
        console.error(error);
        // TODO: Handle error
      }
    };

    fetchPreviousRequests();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Previous Requests</h2>
      <ul>
        {previousRequests.map((request) => (
          <li key={request._id}>
            <p>
              <span>{request.topic}</span> Raised on <span>{request.createdAt}</span> Is <span>{request.status}</span>
              <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Expand</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousRequests;
