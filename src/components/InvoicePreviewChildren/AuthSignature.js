import React from 'react';

const AuthSignature = (props) => {
    const signPic = props.signaturePic
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <p>{`For Empire Pavers and Cement Products`}</p>
      <img style={{width:"25%"}} src={`http://127.0.0.1:8080${signPic}`} alt="Signature" />
      <br />
      <p>Authorized Signatory</p>
    </div>
  )
}

export default AuthSignature