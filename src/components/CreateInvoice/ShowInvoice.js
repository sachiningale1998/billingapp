import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ShowInvoice = (props) => {
    const { show, onHide, invoiceid } = props;
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        if (invoiceid) {
            const getInvoiceDetails = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8080/invoice/invoicedetails/${invoiceid}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    // console.log("data", data);
                    setInvoiceData(data.invoice[0]);
                } catch (error) {
                    console.error('There was a problem fetching invoice details:', error);
                }
            };

            getInvoiceDetails();
        }
    }, [invoiceid]); // Fetch data whenever invoiceid changes

    if (!invoiceData) {
        return null; // Do not render if no invoice data is available
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Invoice Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4">
                    <h5>Invoice Information</h5>
                    <p><strong>Invoice No:</strong> {invoiceData.invoiceNo}</p>
                    <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
                    <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
                    <p><strong>Mobile No:</strong> {invoiceData.customerMobileNo}</p>
                    <p><strong>Billing Address:</strong> {invoiceData.customerBillingAddress}, {invoiceData.customerCity}, {invoiceData.customerState} - {invoiceData.customerZipCode}</p>
                    <p><strong>GST No:</strong> {invoiceData.customerGstNo}</p>
                    <p><strong>Payment Status:</strong> {invoiceData.paymentStatus}</p>
                    <p><strong>Round Off Value:</strong> {invoiceData.roundOffvalue}</p>
                    <p><strong>Tax Amount:</strong> {invoiceData.taxAmount}</p>
                    <p><strong>Taxable Subtotal:</strong> {invoiceData.taxableSubTotal}</p>
                    <p><strong>Total Value:</strong> {invoiceData.totalValue}</p>
                </div>

                <div>
                    <h5>Items</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Unit</th>
                                <th>Tax Amount</th>
                                <th>Tax Percent</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.itemCode}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemQuantity}</td>
                                    <td>{item.itemRate}</td>
                                    <td>{item.itemUnit}</td>
                                    <td>{item.taxAmount}</td>
                                    <td>{item.taxPercent}</td>
                                    <td>{item.totalValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowInvoice;
