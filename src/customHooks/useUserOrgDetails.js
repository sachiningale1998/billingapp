import React, { useState } from 'react';

function getUserId(){
    let token = localStorage.getItem("token");
    token = JSON.parse(atob(token.split('.')[1]));
    let id = token.userId
    return id;
}

const useUserOrgDetails = () => {

    const [userOrgDetailsData, setUserOrgDetailsData] = useState(null)
    const [userId, setUserId] = useState(getUserId())

    const fetchUserOrgDetails = async (userId) => {
        try {
            const response = await fetch(`https://invoicemakerserver.onrender.com/invoice/userOrgDeatils/${userId}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

  return fetchUserOrgDetails;
}

export default useUserOrgDetails