import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/store';

const AuthSignature = (props) => {
    const { getUserOrgDetails } = useStore();
    const [authSignPic, setAuthSignPic] = useState('');
  
    const getBase64ImageFromUrl = async (imageUrl) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
  
    useEffect(() => {
      const fetchOrgDetails = async () => {
        let details = await getUserOrgDetails();
        if (details) {
          details = details.userOrg;
          // console.log("details", details);
          const base64Logo = await getBase64ImageFromUrl(`https://invoicemakerserver.onrender.com${details.orgOwnerSignaturePic}`);
          setAuthSignPic(base64Logo);
        }
      };
      fetchOrgDetails();
    }, [getUserOrgDetails]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <p>{`For Empire Pavers and Cement Products`}</p>
      <img style={{width:"25%"}} src={authSignPic} alt="Signature" />
      <br />
      <p>Authorized Signatory</p>
    </div>
  )
}

export default AuthSignature