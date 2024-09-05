import React from 'react'

const OrgBankDetails = () => {
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
            <p><strong>Bank Of Baroda</strong></p>
            <p><strong>11290200000622</strong></p>
            <p><strong>BARB0BHENDE</strong></p>
            <p><strong>BHENDE BUDRUK, DIST AHMEDNAGAR            </strong></p>
         </div>
    </div>
  )
}

export default OrgBankDetails;