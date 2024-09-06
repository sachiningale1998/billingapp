import React from 'react'

const useGetUserId = () => {
 
        let auth = localStorage.getItem('token') || null;
        if(auth){
          let tokenInfo = JSON.parse(atob(auth.split(".")[1]));
          let user = JSON.stringify(tokenInfo.id);
          console.log(user);
          
          if(user){
            return user
          }else{
            return null
          }
        }
}

export default useGetUserId