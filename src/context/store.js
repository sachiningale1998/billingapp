import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({children}) {
    
    const [invoices, setInvoices] = useState([]); // Store fetched invoices
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);   // Total pages
    const [itemsPerPage] = useState(10);
    const [userId, setUserId] = useState(""); // Store user ID
    const [searchQuery, setSearchQuery] = useState(""); // Store search query
   
    async function getUserOrgDetails(){

        let userId = ""
        let auth = localStorage.getItem('token') || null;
        if(auth){
          let tokenInfo = JSON.parse(atob(auth.split(".")[1]));
          let user = tokenInfo.id;
          userId = user;
        //   console.log("userId", userId);          
        }
        try {
            const response = await fetch(`https://invoicemakerserver.onrender.com/invoice/userOrgDetails/${userId}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }


    // Function to fetch and store invoices based on search
    async function handleSearchStore({searchQuery, userId, pageNumber=1}) {
        // console.log(searchQuery, "userId", userId);
        if (!searchQuery || !userId) {
            toast.error("Search query or userId is missing.");
            return;
        }
        try {
            let resp = await fetch(`https://invoicemakerserver.onrender.com/invoice/${userId}/searchedquery/${encodeURIComponent(searchQuery)}?page=${pageNumber}&limit=${itemsPerPage}`);
            if (!resp.ok) {
                toast.error(resp.status)
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            let data = await resp.json();
            setInvoices(data.searchedInvoices); // Store invoices in state
            setTotalPages(data.totalPages);
            if(data.searchedInvoices.length ===0){
                toast.error('No results found...')
                return;
            }
            return data;
        } catch (error) {
            console.error("Error searching: ", error.message);
        }
    }

    function getUserId(){
        let token = localStorage.getItem('token') || null;
        if(token){
            let tokenInfo = JSON.parse(atob(token.split('.')[1]));
            let user = tokenInfo.id;
            // console.log(user, "userid");
            setUserId(user);
            return user;
        }
    }


    const value = { 
        getUserOrgDetails,
        handleSearchStore, 
        invoices, // Share the invoices data
        currentPage,
        totalPages,
        searchQuery, 
        setSearchQuery,
        setCurrentPage,
        getUserId,
        userId
    };
      return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
      );
}
