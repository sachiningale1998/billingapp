import React from 'react'

const OrgBankDetails = (props) => {
    const bankDetails = props.bankDetails;
  return (
    <div className='orgBankDetailsConatainer d-flex flex-row mb-2'> 
         <div className="p-2">
         <strong>Bank Details</strong>
            <p>Bank :</p>
            <p>Account # : </p>
            <p>IFSC Code :</p>
            <p>Branch :</p>
         </div>
         <div className="p-2">
            <p></p>
            <p><strong>{bankDetails.bankName}</strong></p>
            <p><strong>{bankDetails.accNumber}</strong></p>
            <p><strong>{bankDetails.ifscCode}</strong></p>
            <p><strong>{bankDetails.bankBranchName}</strong></p>
         </div>
    </div>
  )
}

export default OrgBankDetails;