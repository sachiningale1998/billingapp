import React, { useContext, useState } from "react";
import useGetUserId from "../customHooks/useGetUserId";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}



export function StoreProvider({children}) {

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
            const response = await fetch(`http://127.0.0.1:8080/invoice/userOrgDetails/${userId}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }


    const value = { getUserOrgDetails};
      return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
      );
}
