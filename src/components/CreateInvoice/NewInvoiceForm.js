import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import "../../styles/newInvoiceForm.css";

const NewInvoiceForm = () => {
  const [formValues, setFormValues] = useState({
    customerName: "",
    customerGstNo: "",
    customerBillingAddress: "",
    customerCity: "",
    customerZipCode: "",
    itemName: "",
    itemRate: "",
    itemQuantity: "",
    itemCode: "",
  });

  const [taxAmount, setTaxAmount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Calculate tax and total value whenever quantity or rate changes
    if (name === "itemRate" || name === "itemQuantity") {
      const quantity = parseFloat(name === "itemQuantity" ? value : formValues.itemQuantity) || 0;
      const rate = parseFloat(name === "itemRate" ? value : formValues.itemRate) || 0;

      const taxableValue = quantity * rate;
      const tax = taxableValue * 0.1; // 10% tax
      const total = taxableValue + tax;

      setTaxAmount(tax.toFixed(2));
      setTotalValue(total.toFixed(2));
    }
  };

  const compressImage = (canvas, quality = 0.5) => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    return tempCanvas.toDataURL('image/jpeg', quality);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const input = document.getElementById('invoicePreview');
    input.style.display = 'block';
  
    html2canvas(input, { scale: 1 }).then((canvas) => {
      input.style.display = 'none'; 
      const compressedImgData = compressImage(canvas, 0.5);
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(compressedImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output('blob');
  
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    }).catch((error) => {
      console.error("Error generating PDF", error);
    });
  };
  

  return (
    <div className="newInvoiceForm_Parent">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="customerName" value={formValues.customerName} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>GST No.</Form.Label>
            <Form.Control type="text" placeholder="Enter GST No." name="customerGstNo" value={formValues.customerGstNo} onChange={handleInputChange} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control placeholder="1234 Main St" name="customerBillingAddress" value={formValues.customerBillingAddress} onChange={handleInputChange} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name="customerCity" value={formValues.customerCity} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose..." name="customerState" onChange={handleInputChange}>
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control name="customerZipCode" value={formValues.customerZipCode} onChange={handleInputChange} />
          </Form.Group>
        </Row>

        <Row>
          <h5>Item details</h5>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Item</Form.Label>
          <Form.Control placeholder="Item name" name="itemName" value={formValues.itemName} onChange={handleInputChange} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Rate</Form.Label>
            <Form.Control name="itemRate" value={formValues.itemRate} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Unit</Form.Label>
            <Form.Select defaultValue="Choose unit..." name="itemUnit" onChange={handleInputChange}>
              <option>Choose ...</option>
              <option>Brass</option>
              <option>Number</option>
              <option>Piece</option>
              <option>Bag</option>
              <option>Meter</option>
              <option>Each</option>
              <option>Kg.</option>
              <option>Feet</option>
              <option>Box</option>
              <option>Liter/Ltr</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control name="itemQuantity" value={formValues.itemQuantity} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>{"Product Code (HSN / SAC)"}</Form.Label>
            <Form.Control name="itemCode" value={formValues.itemCode} onChange={handleInputChange} />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label><h6>Tax Amount: {taxAmount}</h6></Form.Label>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label><h6>Price With Tax: {totalValue}</h6></Form.Label>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Container to capture as PDF */}
      <div id="invoicePreview" style={{ display: 'none' }}>
        {/* This div should contain all the information you want to include in the PDF */}
        <h2>Invoice</h2>
        <p>Name: {formValues.customerName}</p>
        <p>GST No: {formValues.customerGstNo}</p>
        <p>Billing Address: {formValues.customerBillingAddress}</p>
        <p>City: {formValues.customerCity}</p>
        <p>Zip Code: {formValues.customerZipCode}</p>
        <p>Item Name: {formValues.itemName}</p>
        <p>Rate: {formValues.itemRate}</p>
        <p>Quantity: {formValues.itemQuantity}</p>
        <p>Tax Amount: {taxAmount}</p>
        <p>Total Value: {totalValue}</p>
      </div>

      {pdfUrl && (
        <a href={pdfUrl} download={`${formValues.customerName}-Invoice.pdf`}>
          <Button variant="success">Download PDF</Button>
        </a>
      )}
    </div>
  );
}

export default NewInvoiceForm;
