import React from 'react';
import empiregrouplogo from "../../gallery/empiregrouplogo.jpeg";
import "../../styles/invoicePreview.css";

const InvoicePreview = (props) => {
  const { formValues, taxAmount, totalValue } = props;

  return (
    <div id="invoicePreview" style={{display:"none", padding: '20px' }}>
      {/* Company Letterhead Section */}
      <div className="letterhead">
        <div className="row">
          <div className="col-8">
            <h5 className="company-name">Empire Pavers & Cement Products</h5>
            <p className="company-info">
            <strong>Email:</strong> empiregroups01@gmail.com<br />
            <strong>GST No:</strong> 27BHAPN3606F2ZM<br />
            <strong>Address:</strong> Nagapur Phata, Nevasa, Ahmednagar, Maharashtra<br />
            <strong>Contact:</strong> 93222 20903
            </p>
          </div>
          <div className="col-4 text-right companyLogoContainer">
            {/* Add Company Logo Here */}
            <img src={empiregrouplogo} alt="Company Logo" className="companyLogoImg" />
          </div>
        </div>
        <hr />
      </div>


      <div className="customerDetailsContainer">
        <div className="customerDetailsContainerChild1">
            <p className="customerInfoInvoicePreview">
            <strong>Invoice #:</strong> {formValues.invoiceNo}<br />
            <strong>Customer Details:</strong><br />
            <strong>Name : {formValues.customerName} </strong><br />
            <strong>GSTIN : {formValues.customerGstNo}</strong> <br />
            <strong>PH : </strong> {formValues.customerMobileNo}
            </p>
        </div>
        <div></div>
        <hr />
      </div>

      {/* Invoice Content */}
      <h2 className="text-center">Invoice</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>GST No</th>
              <th>Billing Address</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Item Name</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Tax Amount</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formValues.customerName}</td>
              <td>{formValues.customerGstNo}</td>
              <td>{formValues.customerBillingAddress}</td>
              <td>{formValues.customerCity}</td>
              <td>{formValues.customerZipCode}</td>
              <td>{formValues.itemName}</td>
              <td>{formValues.itemRate}</td>
              <td>{formValues.itemQuantity}</td>
              <td>{taxAmount}</td>
              <td>{totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoicePreview;


