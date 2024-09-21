import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useStore } from '../../context/store';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import ShowInvoice from '../CreateInvoice/ShowInvoice';

const SearchedSales = () => {
    const { invoices,
      totalPages,
      currentPage,
      setCurrentPage,
      handleSearchStore,
      userId,
      searchQuery,
      getUserId
    } = useStore();
    const [currentPage1, setCurrentPage1] = useState(1);
    const [totalPages1, setTotalPages1] = useState(1);
    const [itemsPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

    const navigate = useNavigate();

    const handlePageChange = async (pageNumber) => {
      setCurrentPage(pageNumber); // Update current page
      await handleSearchStore({ searchQuery, userId, pageNumber }); // Perform search with new page
    };

    const handleShow = (invoiceId) => {
      setSelectedInvoiceId(invoiceId);
      setModalShow(true);
  };
  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
        {invoices.length >=1 ? (
            <>
            <h3>Search Results</h3>
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
    </>) : (null)
        }

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
}

export default SearchedSales;
