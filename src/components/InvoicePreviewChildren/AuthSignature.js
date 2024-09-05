import React from 'react';
import verifiedSignature from "../../gallery/verifiedSignature.png"

const AuthSignature = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <p>{`For Empire Pavers and Cement Products`}</p>
      <img style={{width:"25%"}} src={verifiedSignature} alt="Signature" />
      <br />
      <p>Authorized Signatory</p>
    </div>
  )
}

export default AuthSignature