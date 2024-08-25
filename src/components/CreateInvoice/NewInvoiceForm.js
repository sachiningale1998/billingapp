import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../styles/newInvoiceForm.css"

const NewInvoiceForm = () => {
  return (
    <div className="newInvoiceForm_Parent" >
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>GST No.</Form.Label>
          <Form.Control type="text" placeholder="Enter GST No." />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Billing Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Row>
        <h5>Item details</h5>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Item</Form.Label>
        <Form.Control placeholder="Item name" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Rate</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Unit</Form.Label>
          <Form.Select defaultValue="Choose unit...">
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
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>{"Product Code (HSN / SAC)"}</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Row>
      <Form.Group as={Col} controlId="formGridCity">
          <Form.Label><h6>Tax Amount: {}</h6></Form.Label>
        </Form.Group>
      <Form.Group as={Col} controlId="formGridCity">
          <Form.Label><h6>Total Value: {}</h6></Form.Label>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default NewInvoiceForm

