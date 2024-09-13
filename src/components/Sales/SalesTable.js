import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import SearchedSales from './SearchedSales';
import { useStore } from '../../context/store';
import { useNavigate } from 'react-router-dom';
import ShowInvoice from '../CreateInvoice/ShowInvoice';

const SalesTable = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage1, setCurrentPage1] = useState(1); // Track current page
    const [totalPages1, setTotalPages1] = useState(1);   // Total pages
    const [itemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const { userId, getUserId } = useStore();
    const navigate = useNavigate();

    // Fetch invoices based on the current page
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                let userId = getUserId();
                const response = await fetch(`https://invoicemakerserver.onrender.com/invoice/${userId}/allinvoices?page=${currentPage1}&limit=${itemsPerPage}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setInvoices(data.invoices); // Set invoices from the API
                setTotalPages1(data.totalPages); // Set total pages from the API
            } catch (error) {
                console.error('There was a problem fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, [currentPage1, itemsPerPage, userId]); // Fetch data whenever the current page changes

    const handleShow = (invoiceId) => {
        setSelectedInvoiceId(invoiceId);
        setModalShow(true);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage1(pageNumber);
    };

    // Generate pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages1; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage1} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <SearchedSales />
            <Table striped responsive="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice No</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((invoice, index) => (
                            <tr key={invoice._id}>
                                <td>{index + 1 + (currentPage1 - 1) * itemsPerPage}</td>
                                <td>{invoice.customerName || 'N/A'}</td>
                                <td>{invoice.totalValue || 'N/A'}</td>
                                <td>{invoice.paymentStatus || 'N/A'}</td>
                                <td>{invoice.invoiceNo}</td>
                                <td>{invoice.invoiceDate}</td>
                                <td>
                                    <Button variant="primary" onClick={() => navigate(`/invoice/${invoice.userId}/${invoice._id}`)}>
                                        Edit
                                    </Button>
                                    <Button variant="primary" onClick={() => handleShow(invoice._id)}>
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No invoices available</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center mt-3">
                <Pagination size="sm">{paginationItems}</Pagination>
            </div>

            {/* ShowInvoice Modal */}
            {modalShow && selectedInvoiceId && (
                <ShowInvoice
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    invoiceid={selectedInvoiceId}
                />
            )}
        </div>
    );
};

export default SalesTable;
