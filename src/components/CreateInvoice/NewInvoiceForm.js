import React, {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import "../../styles/newInvoiceForm.css";
import InvoicePreview from './InvoicePreview';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `0${date}/0${month}/${year}`;
}

const NewInvoiceForm = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [unitOptions] = useState([
    "Choose Unit..", "Brass", "Number", "Piece", "Bag/s", "Meters", "Each", "Kg/s", "Feet", "Box/es", "Liter/s"
  ]);
  
  const [stateOptions] = useState([
    "Choose...", "Maharashtra", "Goa", "Gujarat" // Replace with actual state options
  ]);
  const [formValues, setFormValues] = useState({
    customerName: "",
    customerGstNo: "",
    customerMobileNo: "",
    invoiceNo: "",
    customerBillingAddress: "",
    customerCity: "",
    customerState: "",
    customerZipCode: "",
    items: [
      {
        itemName: "",
        itemRate: "",
        itemQuantity: "",
        itemUnit: "" ,
        itemCode: "",
        taxPercent: 18,
        taxAmount: 0,
        totalValue: 0
      }
    ],
    invoiceDate: currentDate.toString()
  });

  const [pdfUrl, setPdfUrl] = useState(null);
 

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // If changing customer details
    if (name === 'itemUnit') {
      const updatedItems = [...formValues.items];
      updatedItems[index][name] = value;
      setFormValues({
        ...formValues,
        items: updatedItems,
      });
    } else if (name === 'customerState') {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } 
   else if (name !== 'itemName' && name !== 'itemRate' && name !== 'itemQuantity' && name !== 'itemCode') {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else {
      // If changing item details
      const updatedItems = [...formValues.items];
      updatedItems[index][name] = value;

      // Recalculate tax and total value for the specific item
      if (name === "itemRate" || name === "itemQuantity") {
        const quantity = parseFloat(updatedItems[index].itemQuantity) || 0;
        const rate = parseFloat(updatedItems[index].itemRate) || 0;

        const taxableValue = quantity * rate;
        const tax = taxableValue * 0.18; // 18% tax
        const total = taxableValue + tax;

        updatedItems[index].taxAmount = tax.toFixed(2);
        updatedItems[index].totalValue = total.toFixed(2);
      }

      setFormValues({
        ...formValues,
        items: updatedItems,
      });
    }
  };

  const addItem = () => {
    setFormValues(prevState => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          itemName: "",
          itemRate: "",
          itemQuantity: "",
          itemUnit: "",
          itemCode: "",
          taxPercent: 18,
          taxAmount: 0,
          totalValue: 0
        }
      ]
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formValues.items.filter((_, i) => i !== index);
    setFormValues(prevState => ({
      ...prevState,
      items: updatedItems
    }));
  };

  const compressImage = (canvas, quality = 1) => {
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

    // Temporarily set the style to mimic laptop screen size
    input.style.display = 'block';
    input.style.width = '800px';  // Adjust width to match laptop screen size
    input.style.height = 'auto';  // Let the height adjust naturally
    input.style.overflow = 'visible';  // Ensure all content is visible
    input.style.position = 'absolute'; // Temporarily take it out of flow to avoid page reflow

    html2canvas(input, { scale: 1 }).then((canvas) => {
      // Restore styles after capturing
      input.style.display = 'block';
      input.style.width = '';
      input.style.height = '';
      input.style.overflow = '';
      input.style.position = '';

      const compressedImgData = compressImage(canvas, 1);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(compressedImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output('blob');

      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    }).catch((error) => {
      console.error("Error generating PDF", error);
      // Restore styles even if there's an error
      input.style.display = 'none';
      input.style.width = '';
      input.style.height = '';
      input.style.overflow = '';
      input.style.position = '';
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


        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control type="text" placeholder="Customer's Mobile No." name="customerMobileNo" value={formValues.customerMobileNo} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Invoice No.</Form.Label>
            <Form.Control type="text" placeholder="Invoice No." name="invoiceNo" value={formValues.invoiceNo} onChange={handleInputChange} />
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
            <Form.Select
              name="customerState"
              value={formValues.customerState}
              onChange={handleInputChange}
            >
              {stateOptions.map((state, idx) => (
                <option key={idx} value={state}>{state}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control name="customerZipCode" value={formValues.customerZipCode} onChange={handleInputChange} />
          </Form.Group>
        </Row>

  {/* Other customer details fields */}

  {formValues.items.map((item, index) => (
    <div key={index} className="itemDetails">
      <Row className="mb-3">
        <Form.Group as={Col} controlId={`itemName-${index}`}>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            placeholder="Item name"
            name="itemName"
            value={item.itemName}
            onChange={(e) => handleInputChange(e, index)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId={`itemRate-${index}`}>
          <Form.Label>Rate</Form.Label>
          <Form.Control
            name="itemRate"
            value={item.itemRate}
            onChange={(e) => handleInputChange(e, index)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId={`itemQuantity-${index}`}>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            name="itemQuantity"
            value={item.itemQuantity}
            onChange={(e) => handleInputChange(e, index)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Unit</Form.Label>
          <Form.Select
            name="itemUnit"
            value={item.itemUnit}
            onChange={(e) => handleInputChange(e, index)}
          >
            {unitOptions.map((unit, idx) => (
              <option key={idx} value={unit}>{unit}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId={`itemCode-${index}`}>
          <Form.Label>Product Code (HSN / SAC)</Form.Label>
          <Form.Control
            name="itemCode"
            value={item.itemCode}
            onChange={(e) => handleInputChange(e, index)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label><h6>Taxable Amount (18%): {item.itemRate * item.itemQuantity}</h6></Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label><h6>Tax Payable: {item.taxAmount}</h6></Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label><h6>Price With Tax: {item.totalValue}</h6></Form.Label>
        </Form.Group>
      </Row>

      {index > 0 && (
        <Button variant="danger" onClick={() => removeItem(index)}>
          Remove Item
        </Button>
      )}
    </div>
  ))}

  {formValues.items.length < 6 && (
    <Button variant="primary" onClick={addItem}>
      Add Another Item
    </Button>
  )}

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>


      {/* Invoice preview component  */}
      <InvoicePreview formValues={formValues} taxAmount={formValues.taxAmount} totalValue={formValues.totalValue} />

      {pdfUrl && (
        <a href={pdfUrl} download={`${formValues.customerName}-Invoice.pdf`}>
          <Button variant="success" n>Download PDF</Button>
        </a>
      )}
    </div>
  );
}

export default NewInvoiceForm;
