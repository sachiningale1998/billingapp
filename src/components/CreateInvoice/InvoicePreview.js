import React from 'react';
import empiregrouplogo from "../../gallery/empiregrouplogo.jpeg";
import "../../styles/invoicePreview.css";
import { ToWords } from 'to-words';

const InvoicePreview = (props) => {
  const { formValues } = props;
//   console.log("formValues", formValues)
const toWords = new ToWords();
// let words = toWords.convert(452, { currency: true });
  // Calculate total tax amount and total value for all items
  const totalTaxAmount = formValues.items.reduce((total, item) => total + parseFloat(item.taxAmount || 0), 0);
  const totalTotalValue = formValues.items.reduce((total, item) => total + parseFloat(item.totalValue || 0), 0);

  return (
    <div id="invoicePreview" style={{ display: "none", padding: '20px' }}>
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
        <hr />
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
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.itemRate}</td>
                <td>{`${item.itemQuantity} ${item.itemUnit}`}</td>
                <td>{(item.totalValue - item.taxAmount)}</td>
                <td>{item.taxAmount}</td>
                <td>{item.totalValue}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5"><strong>Total</strong></td>
              <td><strong>{totalTaxAmount.toFixed(2)}</strong></td>
              <td><strong>{totalTotalValue.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div className="textRightDataAfterTable">
            <div className="textRightDataAfterTableHeadings">
                <p><strong>Taxable Amount :</strong></p>
                <p><strong>CGST 9% :</strong></p>
                <p><strong>SGST 9% :</strong></p>
                <p><strong>Grand Total:</strong></p>
            </div>
            <div className="textRightDataAfterTableData">
                <p><strong>{(totalTotalValue - totalTaxAmount).toFixed(2)}</strong></p>
                <p><strong>{(totalTaxAmount/2).toFixed(2)}</strong></p>
                <p><strong>{(totalTaxAmount/2).toFixed(2)}</strong></p>
                <p style={{fontSize:"22px"}}><strong>{parseFloat(totalTotalValue).toFixed(2)}</strong></p>
            </div>
        </div>
        <div style={{textAlign:"right"}}>
            <p> Total Amount in Words (INR) : {toWords.convert(totalTotalValue, { currency: true })}</p>
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
