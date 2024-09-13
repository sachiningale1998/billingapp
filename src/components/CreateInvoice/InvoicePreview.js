import React, { useEffect, useState } from 'react';
import "../../styles/invoicePreview.css";
import { ToWords } from 'to-words';
import OrgBankDetails from '../InvoicePreviewChildren/OrgBankDetails';
import AuthSignature from '../InvoicePreviewChildren/AuthSignature';
import TermsAndConditions from '../InvoicePreviewChildren/TermsAndConditions';
import { useStore } from '../../context/store';

const InvoicePreview = (props) => {
  const { formValues } = props;
  const { getUserOrgDetails } = useStore();
  const [orgDetails, setOrgDetails] = useState(null);
  const [orgLogoPic, setOrgLogoPic] = useState('');

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
        setOrgDetails(details);
        // console.log("details", details);
        const base64Logo = await getBase64ImageFromUrl(`https://invoicemakerserver.onrender.com${details.orgLogoPic}`);
        setOrgLogoPic(base64Logo);
      }
    };
    fetchOrgDetails();
  }, [getUserOrgDetails]);
  
const toWords = new ToWords();
// let words = toWords.convert(452, { currency: true });
  // Calculate total tax amount and total value for all items
  const totalTaxAmount = formValues.items.reduce((total, item) => total + parseFloat(item.taxAmount || 0), 0);
  const totalTotalValue = formValues.items.reduce((total, item) => total + parseFloat(item.totalValue || 0), 0);

  return (
    <div id="invoicePreview" style={{ display: "none", padding: '20px' }}>
      {/* Company Letterhead Section */}
      {orgDetails && <div className="letterhead">
        <div className="row">
          <div className="col-8">
            <h5 className="company-name">{orgDetails.orgName}</h5>
            <p className="company-info">
              <strong>Email:</strong> {orgDetails.orgEmail}<br />
              <strong>GST No:</strong> {orgDetails.orgGstNo}<br />
              <strong>Address:</strong> {orgDetails.orgAddress} <br />
              <strong>Contact:</strong> {orgDetails.orgPhone}
            </p>
          </div>
          <div className="col-4 text-right companyLogoContainer">
            {/* Add Company Logo Here */}
            <img 
                style={{ width: '100%', height:'80px' }}
                src={orgLogoPic}
                alt="Company Logo"
                className="companyLogoImg" 
                loading="lazy" 
             />
          </div>
        </div>
        <div className="colorHrLine"></div>
      </div>}

      <div className="customerDetailsContainer">
        <div className="customerDetailsContainerChild1">
          <p className="customerInfoInvoicePreview">
            <strong>Invoice #:</strong> {formValues.invoiceNo}<br />
            <strong>Customer Details:</strong><br />
            <strong>Name:</strong> {formValues.customerName}<br />
            <strong>GSTIN:</strong> {formValues.customerGstNo}<br />
            <strong>PH:</strong> {formValues.customerMobileNo}
          </p>
        </div>
        <div className="customerDetailsContainerChild1">
          <p className="customerInfoInvoicePreview">
            <strong>Invoice Date:</strong> {formValues.invoiceDate}<br />
            <strong>Billing Address:</strong><br />
            {`${formValues.customerBillingAddress}, ${formValues.customerState}`}<br />
            <strong>City:</strong> {formValues.customerCity}<br />
            <strong>Zip Code:</strong> {formValues.customerZipCode}
          </p>
        </div>
        <div className="colorHrLine"></div>
      </div>

      {/* Invoice Content */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Taxable Value</th>
                <th>Tax Amount</th>
                <th>Total Value</th>
              </tr>
          </thead>
          <tbody>
            {formValues.items.map((item, index) => (
              <tr key={index}>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{index + 1}</td>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{item.itemName}</td>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{item.itemRate}</td>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{`${item.itemQuantity} ${item.itemUnit}`}</td>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{(item.totalValue - item.taxAmount).toFixed(2)}</td>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{item.taxAmount}</td>
                <td style={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>{item.totalValue}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5"><strong>Total</strong></td>
              <td><strong>{totalTaxAmount.toFixed(2)}</strong></td>
              <td><strong>{totalTotalValue.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        <div className="textRightDataAfterTable">
            <div className="textRightDataAfterTableHeadings">
                <p><strong>Taxable Amount :</strong></p>
                <p><strong>CGST 9% :</strong></p>
                <p><strong>SGST 9% :</strong></p>
                <p><strong>Round Off :</strong></p>
                <p><strong>Grand Total:</strong></p>
            </div>
            <div className="textRightDataAfterTableData">
                <p><strong>{(totalTotalValue - totalTaxAmount).toFixed(2)}</strong></p>
                <p><strong>{(totalTaxAmount/2).toFixed(2)}</strong></p>
                <p><strong>{(totalTaxAmount/2).toFixed(2)}</strong></p>
                <p><strong>{(totalTotalValue - Math.round(totalTotalValue)).toFixed(2)}</strong></p>
                <p style={{fontSize:"22px"}}><strong>{parseFloat(Math.round(totalTotalValue)).toFixed(2)}</strong></p>
            </div>
        </div>
        <div style={{textAlign:"right"}}>
            <p> Total Amount in Words (INR) : {toWords.convert(Math.round(totalTotalValue), { currency: true })}</p>
        </div>
        <div className="colorHrLine"></div>

        {/* amount paid or pending component */}
        <div style={{marginLeft:'85%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0997cf" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg> 
            <span style={{marginLeft:"0.4rem"}}><strong>Amount Paid</strong></span>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        {/* Bank details and Signature component */}
        <div>
            {orgDetails && <OrgBankDetails orgDetails={orgDetails} />}
        </div>
        <div>
            {orgDetails && <AuthSignature signaturePic={orgDetails.orgOwnerSignaturePic} />}
        </div>
        </div>
        {/* Terms and conditions component */}
        <div>
            <TermsAndConditions />
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
